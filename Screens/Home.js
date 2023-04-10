import { View, FlatList, TextInput, SafeAreaView, Pressable, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DiaryCard from '../components/DiaryCard';
import { getCloestDiariesQueue, getDiaryBySpecies, getDiaryQueueByUser, getLatestDiariesQueue, getLikeList, getLikeListQueue } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { MaterialIcons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';
import { onSnapshot } from 'firebase/firestore';
import { Logs } from 'expo';
import LocationManager from '../components/LocationManager';
import * as geofire from 'geofire-common';

export default function Home({ navigation, route }) {
  // const [diaries, setDiaries] = useState([{uid:'InsBmnicOLXLK3LAm1m2gdk5ND32',author:'lesly',species:'bamboo',date:'2023-03-24',location:'Downtown Vancouver', story:'this is my bamboo',like:4},{uid:'InsBmnicOLXLK3LAm1m2gdk5ND32',author:'boris',species:'rose',date:'2023-03-21',location:'Surrey',story:'this is my rose',like:16}]);
  const [diaries, setDiaries] = useState(null);
  const [likeList, setLikeList] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recommand");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Sorted by: Recommand', value: 'recommand'},
    {label: 'By Location', value: 'location'},
    // {label: 'By Species', value: 'species'}
  ]);
  const [recommend, setRecommend] = useState(route.params.recommend);
  // const [url, setImageUrl]= useState([]);
  const [location, setLocation] = useState(null);
  const [isLoading,setIsLoading]=useState(false);
  function setLoadingLocation(status){
    setIsLoading(status)
  }
  useEffect(()=>{
    async function fetchDiaries(){
      let q;
      console.log(sort);
      if (sort === "recommand") {
        q = getLatestDiariesQueue();
        console.log("latest", q);
        const unsubscribe1 = onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.empty){
            setDiaries([]);
          }
          if (!querySnapshot.empty) {
            const newdiaries = [];
            querySnapshot.docs.forEach((doc) => {
              newdiaries.push({ ...doc.data(), diaryId:doc.id});
              // console.log(doc.data().photos[0]);
            });
            setDiaries(newdiaries);
          }
        },
        (err) => {
          console.log(err);
        })
       
      } else if (sort === "location") {
        //console.log("location",location);
        
          const cloestDiaries = await getCloestDiariesQueue(location);
          const unsubscribe2 = () => {
            setDiaries(cloestDiaries);
          }
          
          setLocation(null);
          // setStatus(!status);
      
          // await q.sort(async (a,b)=>{
          //   	const distanceFromA = await geofire.distanceBetween([a.location[2],a.location[3]],center);
          //   	const distanceFromB = await geofire.distanceBetween([b.location[2],b.location[3]],center);
          //   	return distanceFromA - distanceFromB;
          //   })
       
        // q = getDiaryQueueByUser(auth.currentUser.uid);
      }
      ;
      return () => {
        unsubscribe1();
        unsubscribe2();
      };

    }
    fetchDiaries();
      
  },[sort,location])

  useEffect(()=>{
    const q = getLikeListQueue();
    const unsubscribe2 = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty&&typeof snapshot.data() !== 'undefined') {
        setLikeList(snapshot.data().likeDiaries);
      }
    });
    return () => {
      unsubscribe2();
    };
  },[])
  async function searchDiaries(species){
    //console.log(species);
    if(!species.trim()){
      Alert.alert("Species cannot be blank. Please input a species.");
			return;
    }
    const searchResult = await getDiaryBySpecies(species.trim().toLowerCase());
    setDiaries(searchResult);
  }



  return (
    <SafeAreaView style={styles.container}>
      {recommend && 
      <View style={styles.topContainer}>
      <View style={styles.iconInput}>
        <TextInput 
        style={styles.input}
        placeholder='Search a plant' 
        value={search} 
        onChangeText={(newSearch)=>{setSearch(newSearch)}} 
        />
        <PressableButton buttonPressed={()=>{searchDiaries(search)}}>
          <MaterialIcons name="search" size={24} color="black" style={styles.icon} />
        </PressableButton>
      </View>
      <View style={styles.drop}>
        <DropDownPicker
          open={open}
          value={sort}
          items={items}
          setOpen={setOpen}
          setValue={setSort}
          setItems={setItems}
          onChangeValue={setSort}
        />
      </View>
      </View>
      }
      {diaries&&
        <FlatList
          data={diaries}
          keyExtractor={item=>item.diaryId}
          renderItem={({item})=>{
            return (
              <Pressable onPress={()=>navigation.navigate('Gallery',{item:item})} >
                <DiaryCard item={item} like={likeList&&likeList.includes(item.diaryId)}/>
              </Pressable>
            )
          }}
        />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize:18, 
    padding:14,
  },
  inputContainer: {
    width: 300,
  },
  iconInput: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  icon: {
    padding: 10,
  },
  drop: {
    width: 300,
    fontSize: 18,
    borderRadius: 10,
  },
  topContainer: {
    zIndex: 100,
  }
})