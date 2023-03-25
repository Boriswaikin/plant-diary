import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Profile({ navigation, userProfile }) {
  const [profile, setProfile] = useState();
  const [diaries, setDiaries] = useState();
  useEffect(()=>{
    if (userProfile) setProfile(userProfile);
    else setProfile({id:'uds29df',head:'head-url',name:'david',postCount:10,followers:34,followings:45,achievements:['achievement-1','achievement-2'],diaries:['342','234','809']})
    // const curDiaries = getDiaries(id);
    // const diaryList = profile.diaries.map((x) => ({diaryId:x,diaryPic:getDiary(x)[0]}));
    const diaryist = [{diaryId:123, diaryPic:'pic-url1'}, {diaryId:234, diaryPic:'pic-url2'}]
    setDiaries(diaryList);

  },[])
  return (
    <View>
      <View>
        <Text>User head photo: {profile.head}</Text>
        <Text>User name: {profile.name}</Text>
        <Text>Post number: {profile.postCount}</Text>
        <Text>Followers: {profile.followers}</Text>
        <Text>Followings: {profile.followings}</Text>
        <Text>Achievement: {profile.achievements}</Text>
      </View>
      <View>
        <FlatList 
        data={diaries}
        renderItem={({item})=>{
          return (
            <Text>{item.diaryPic}</Text>
          )
        }}
         />
      </View>
      <View>
        <Button title='Home' onPress={()=>navigation.navigate('Home')} />
        <Button title='Create a Diary' onPress={()=>navigation.navigate('Create')} />
        <Button title='Profile' disabled={true} />
      </View>
    </View>
  )
}