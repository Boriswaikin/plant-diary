import { View, Text, Button, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import DiaryItem from '../DiaryItem';

export default function Home({ navigation }) {
  const [diaries, setDiaries] = useState([{species:'bamboo',date:'2023-03-24',location:'Downtown Vancouver',likes:4},{species:'rose',date:'2023-03-21',location:'Surrey',likes:16}]);
  const [search, setSearch] = useState();

  function diaryPressed(item) {
    navigation.navigate('Gallery', {item:item})
  }

  return (
    <View>
      <View>
        <Button title='Recommend' />
        <Button title='Subscribed' />
        <TextInput placeholder='search a plant' value={search} onChangeText={setSearch} />
        <Button title='Search' />
        <Button title='Sort by' />
      </View>
      <View>
        <FlatList
          data={diaries}
          renderItem={({item})=>{
            return (
              <DiaryItem item={item} onDiaryPressed={()=>diaryPressed(item)} />
            )
          }}
        />
      </View>
      {/* <View>
        <Button title='Home' disabled={true} />
        <Button title='Create a Diary' onPress={()=>navigation.navigate('Create')} />
        <Button title='Go to My Profile' onPress={()=>navigation.navigate('Profile')} />
      </View> */}
    </View>
  )
}