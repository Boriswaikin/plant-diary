import { View, Text, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Profile({ navigation, route }) {
  const [profile, setProfile] = useState({id:'uds29df',head:'head-url',name:'david',postCount:10,followers:34,followings:45,achievements:['achievement-1','achievement-2'],diaries:['342','234','809']});
  const [diaries, setDiaries] = useState();
  const [self, setSelf] = useState(true);
  useEffect(()=>{
    if (route.params && route.params.userProfile) setProfile(route.params.userProfile);
    // else setProfile();
    // console.log(profile);
    // const curDiaries = getDiaries(id);
    // const diaryList = profile.diaries.map((x) => ({diaryId:x,diaryPic:getDiary(x)[0]}));
    const diaryList = [{diaryId:123, diaryPic:'pic-url1'}, {diaryId:234, diaryPic:'pic-url2'}]
    setDiaries(diaryList);

  },[])
  return (
    <View>
      <View>
        <Text>User head photo: {profile.head}</Text>
        <Text>User name: {profile.name}</Text>
        {self && <Button title='Edit Profile' onPress={()=>navigation.navigate('EditProfile')}/>}
        <Text>Post number: {profile.postCount}</Text>
        <Text>Followers: {profile.followers}</Text>
        <Text>Followings: {profile.followings}</Text>
        <Text>Achievement</Text>
        <FlatList 
        data={profile.achievements}
        renderItem={({item})=>{
          return (
            <Text>{item}</Text>
          )
        }}
         />
      </View>
      <View>
        <Text>Grid</Text>
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