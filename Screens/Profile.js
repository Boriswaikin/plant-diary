import { View, Text, FlatList, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Profile({ navigation, route }) {
  const [profile, setProfile] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [self, setSelf] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(()=>{
    if (route.params && route.params.userProfileId) {
      let currentProfile = getProfile(route.params.userProfileId);
      setProfile(currentProfile);
      setSelf(false);
      // let relation = checkRelation(selfId, thirdId);
      // setFollowing(relation);
    } else {
      // let currentProfile = getProfile(selfId);
      // setProfile(currentProfile);
      const temp = {id:'uds29df',head:'head-url',name:'david',postCount:10,followers:34,followings:45,achievements:['achievement-1','achievement-2'],diaries:['342','234','809']};
      setProfile(temp);
    }
    
    // const diaryList = profile.diaries.map((x) => ({diaryId:x,diaryPic:getDiary(x)[0]}));
    const diaryList = [{diaryId:123, diaryPic:'pic-url1'}, {diaryId:234, diaryPic:'pic-url2'}]
    setDiaries(diaryList);

  },[])

  function pressFollow() {
    // followUser(selfId,thirdId);
    setFollowing(true);
    console.log('Follow user');
  }

  function pressUnfollow() {
    // unfollowUser(selfId,thirdId);
    setFollowing(false);
    console.log('Unfollow user');
  }

  return (
    <View>
      <View>
        <Text>User head photo: {profile.head}</Text>
        <Text>User name: {profile.name}</Text>
        {self && <Button title='Edit Profile' onPress={()=>navigation.navigate('EditProfile')}/>}
        <Text>Post number: {profile.postCount}</Text>
        <Pressable onPress={()=>navigation.navigate('Follow', {id:profile.id,followState:true})}><Text>Followers: {profile.followers}</Text></Pressable>
        <Pressable onPress={()=>navigation.navigate('Follow', {id:profile.id,followState:false})}><Text>Followings: {profile.followings}</Text></Pressable>
        {!self && following && <Button title="Following" onPress={()=>pressUnfollow()} />}
        {!self && !following && <Button title="Follow" onPress={()=>pressFollow()} />}
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