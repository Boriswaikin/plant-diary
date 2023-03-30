import { View, Text, Button, FlatList, TextInput, SafeAreaView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import DiaryItem from '../DiaryItem';
import DropDownPicker from 'react-native-dropdown-picker';
import DiaryCard from '../components/DiaryCard';
import GalleryBox from '../components/GallaryBox';
import SearchBar from '../components/SearchBar';
import { getDiaryById, getDiaryQueueByUser, getLatestDiariesQueue } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { onSnapshot } from 'firebase/firestore';

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

  useEffect(()=>{
      let q;
      if (recommend) {
        q = getLatestDiariesQueue();
        // console.log(currentDiary);
        // setDiaries(currentDiary);
      } else {
        q = getDiaryQueueByUser(auth.currentUser.uid);
        // setDiaries(currentDiary);
      }
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          setDiaries([]);
        } else {
          let diaries = [];
          querySnapshot.docs.forEach((doc) => {
            diaries.push({ ...doc.data(), diaryId: doc.id });
          });
          setDiaries(diaries);
        }
      });
      return () => {
        unsubscribe();
      };
  },[])

  return (
    <SafeAreaView>
      {recommend && 
      <View style={{ zIndex: 100 }}>
        <SearchBar />
        <TextInput placeholder='search a plant' value={search} onChangeText={setSearch} />
        <Button title='Search' />
        <View>
        <DropDownPicker
          open={open}
          value={sort}
          items={items}
          setOpen={setOpen}
          setValue={setSort}
          setItems={setItems}
        />
        </View>
      </View>}
      <View>
        <FlatList
          data={diaries}
          renderItem={({item})=>{
            return (
              <View>
                <Pressable onPress={()=>navigation.navigate('Gallery',{item:item})} >
                <DiaryItem item={item} />
                <DiaryCard />
                </Pressable>
              </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}