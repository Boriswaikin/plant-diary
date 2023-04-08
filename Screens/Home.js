import { View, FlatList, TextInput, SafeAreaView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DiaryCard from '../components/DiaryCard';
import { getDiaryQueueByUser, getLatestDiariesQueue, getLikeList, getLikeListQueue } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { MaterialIcons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';
import { onSnapshot } from 'firebase/firestore';

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
    {label: 'By Species', value: 'species'}
  ]);
  const [recommend, setRecommend] = useState(route.params.recommend);
  // const [url, setImageUrl]= useState([]);
  useEffect(()=>{
      let q;
      if (recommend) {
        q = getLatestDiariesQueue();
      } else {
        q = getDiaryQueueByUser(auth.currentUser.uid);
      }
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
      });
      return () => {
        unsubscribe();
      };
  },[])

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



  return (
    <SafeAreaView style={styles.container}>
      {recommend && 
      <View style={styles.topContainer}>
      <View style={styles.iconInput}>
        <TextInput 
        style={styles.input}
        placeholder='Search a plant' 
        value={search} 
        onChangeText={(newSearch)=>{setEmail(newSearch)}} 
        />
        <PressableButton buttonPressed={()=>{console.log("search")}}>
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
        />
      </View>
      </View>
      }
      {diaries&&<View>
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
        />
      </View>}
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