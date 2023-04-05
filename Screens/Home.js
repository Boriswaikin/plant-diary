import { View, Text, Button, FlatList, TextInput, SafeAreaView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import DiaryItem from '../DiaryItem';
import DropDownPicker from 'react-native-dropdown-picker';
import DiaryCard from '../components/DiaryCard';
import SearchBar from '../components/SearchBar';
import { getDiaryById, getDiaryQueueByUser, getLatestDiariesQueue } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { MaterialIcons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';
import { onSnapshot } from 'firebase/firestore';
import {storage} from "../Firebase/firebase-setup";
import { getDownloadURL ,ref} from "firebase/storage";

export default function Home({ navigation, route }) {
  // const [diaries, setDiaries] = useState([{uid:'InsBmnicOLXLK3LAm1m2gdk5ND32',author:'lesly',species:'bamboo',date:'2023-03-24',location:'Downtown Vancouver', story:'this is my bamboo',like:4},{uid:'InsBmnicOLXLK3LAm1m2gdk5ND32',author:'boris',species:'rose',date:'2023-03-21',location:'Surrey',story:'this is my rose',like:16}]);
  const [diaries, setDiaries] = useState([]);
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
      async function getImageUrl(uri) {
      try{
      const reference = ref(storage,uri);
      const url = await getDownloadURL(reference);
      return url;
      // console.log(url);
      // setImageUrl(url);
      } catch (err){
        console.log("get image url", err);
      }
      }

      async function getAllImageUrl(source) {
        let imageUri=[];
        let imageUrlAll=[];
        try{
          imageUri=source.map(
            (item)=>{
              return getImageUrl(item);
            }
          )
          imageUrlAll= await Promise.all(imageUri);
          return imageUrlAll;
        }
        catch (err){
          console.log("image Download error",err);
      }}

      let q;
      if (recommend) {
        q = getLatestDiariesQueue();
      } else {
        q = getDiaryQueueByUser(auth.currentUser.uid);
      }
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          setDiaries([]);
        } else {
          let diaries = [];
          
          querySnapshot.docs.forEach(async (doc) => {
            const urlItem= await getAllImageUrl(doc.data().photosUri);
            if(urlItem){
            // setImageUrl(urlItem);
            diaries.push({ ...doc.data(), diaryId: doc.id ,imageUri:urlItem});
            // console.log(diaries);
            setDiaries(diaries);
        }});
          
        } 
      });
      return () => {
        unsubscribe();
      };
  },[])

  return (
    <SafeAreaView style={styles.container}>
      {recommend && 
      // <View style={{ width: 300 }}>
      //   {/* <SearchBar /> */}
      //   <TextInput placeholder='search a plant' value={search} onChangeText={setSearch} />
      //   <Button title='Search' />
      //   <View>
      //   <DropDownPicker
      //     open={open}
      //     value={sort}
      //     items={items}
      //     setOpen={setOpen}
      //     setValue={setSort}
      //     setItems={setItems}
      //   />
      //   </View>
      // </View>
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
      <View>
        <FlatList
          data={diaries}
          renderItem={({item})=>{
              // console.log(item.imageUri);
            return (
              <View>
                <Pressable onPress={()=>navigation.navigate('Gallery',{item:item,imageUri:item.imageUri})} >
                {/* <DiaryItem item={item} /> */}
                {item.imageUri && <DiaryCard itemData={item.imageUri}/>}
                </Pressable>
              </View>
            )
          }}
        />
      </View>
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