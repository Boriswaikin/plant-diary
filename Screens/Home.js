import { View, Text, Button, FlatList, TextInput, SafeAreaView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import DiaryItem from '../DiaryItem';
import DropDownPicker from 'react-native-dropdown-picker';
import DiaryCard from '../components/DiaryCard';
import SearchBar from '../components/SearchBar';
import { getDiaryByUser, getLatestDiaries } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { MaterialIcons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';

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
    (async ()=>{
      if (recommend) {
        const currentDiary = await getLatestDiaries();
        // console.log(currentDiary);
        setDiaries(currentDiary);
      } else {
        const currentDiary = await getDiaryByUser(auth.currentUser.uid);
        setDiaries(currentDiary);
      }
    })();
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