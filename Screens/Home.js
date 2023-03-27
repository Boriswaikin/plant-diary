import { View, Text, Button, FlatList, TextInput, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import DiaryItem from '../DiaryItem';
import DropDownPicker from 'react-native-dropdown-picker';
import DiaryCard from '../components/DiaryCard';
import GalleryBox from '../components/GallaryBox';
import SearchBar from '../components/SearchBar';

export default function Home({ navigation, route }) {
  const [diaries, setDiaries] = useState([{uid:'InsBmnicOLXLK3LAm1m2gdk5ND32',author:'lesly',species:'bamboo',date:'2023-03-24',location:'Downtown Vancouver', story:'this is my bamboo',likes:4},{uid:'InsBmnicOLXLK3LAm1m2gdk5ND32',author:'boris',species:'rose',date:'2023-03-21',location:'Surrey',story:'this is my rose',likes:16}]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recommand");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Sorted by: Recommand', value: 'recommand'},
    {label: 'By Location', value: 'location'},
    {label: 'By Species', value: 'species'}
  ]);
  const [recommend, setRecommend] = useState(route.params.recommend);

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
                <DiaryCard />
                </Pressable>
                {/* <DiaryItem item={item} /> */}
              </View>
            )
          }}
        />
      </View>
      {/* <View>
        <Button title='Home' disabled={true} />
        <Button title='Create a Diary' onPress={()=>navigation.navigate('Create')} />
        <Button title='Go to My Profile' onPress={()=>navigation.navigate('Profile')} />
      </View> */}
    </SafeAreaView>
  )
}