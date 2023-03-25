import { View, Text, Button, FlatList } from 'react-native'
import React, { useState } from 'react'

export default function Follow({ navigation, route }) {

  const [users, setUsers] = useState([{id:1314, name:'hana', head:'head-url-1', following:true},{id:1315, name:'john', head:'head-url-2',following:false}]);
  const [followState, setFollowState] = useState(route.params.followState);

  // useEffect(()=>{
  //   if (followState) {
  //     let userList = getFollowers(route.params.id);
  //     setUsers(userList);
  //   } else {
  //     let userList = getFollowings(route.params.id);
  //     setUsers(userList);
  //   }
  // },[]);

  function changeToFollowers() {
    // let userList = getFollowers(route.params.id);
    // setUsers(userList);
    console.log("change to followers list");
    setFollowState(true);
  }

  function changeToFollowings() {
    // let userList = getFollowings(route.params.id);
    // setUsers(userList);
    console.log("change to followings list");
    setFollowState(false);
  }

  function pressFollow(id) {
    // followUser(selfId,thirdId);
    console.log('Follow user', id);
  }

  function pressUnfollow(id) {
    // unfollowUser(selfId,thirdId);
    // setFollowing(false);
    console.log('Unfollow user', id);
  }

  return (
    <View>
      <View>
        <Button title='Followers' disabled={followState} onPress={()=>changeToFollowers()} />
        <Button title='Followings' disabled={!followState} onPress={()=>changeToFollowings()} />
      </View>
      <View>
        <FlatList
        data={users}
        renderItem={({item})=>{
          return (
            <View>
              <Text>{item.head}</Text>
              <Text>{item.name}</Text>
              {item.following ? <Button title="Following" onPress={()=>pressUnfollow(item.id)} />
              : <Button title="Follow" onPress={()=>pressFollow(item.id)} />}
            </View>
          )
        }}
        />
      </View>
    </View>
  )
}