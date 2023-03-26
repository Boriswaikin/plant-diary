import { View, Text, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import UserList from '../components/UserList';

export default function Follow({ navigation, route }) {

  const [users, setUsers] = useState([{id:1314, name:'hana', head:'head-url-1', following:true},{id:1315, name:'john', head:'head-url-2',following:false}]);
  const [followState, setFollowState] = useState(route.params.followState);

  // useEffect(()=>{
  //   if (followState) {
  //     let userList = getFollower(route.params.id);
  //     setUsers(userList);
  //   } else {
  //     let userList = getFollowing(route.params.id);
  //     setUsers(userList);
  //   }
  // },[]);

  function changeToFollower() {
    // let userList = getFollower(route.params.id);
    // setUsers(userList);
    console.log("change to follower list");
    setFollowState(true);
  }

  function changeToFollowing() {
    // let userList = getFollowing(route.params.id);
    // setUsers(userList);
    console.log("change to following list");
    setFollowState(false);
  }

  function pressFollow(id) {
    // followUser(id);
    console.log('Follow user', id);
    // update id user relationship 
  }

  function pressUnfollow(id) {
    // unfollowUser(id);
    // setFollowing(false);
    console.log('Unfollow user', id);
    // update id user relationship 
  }

  return (
    <View>
      {/* <View>
        <Button title='Followers' disabled={followState} onPress={()=>changeToFollower()} />
        <Button title='Followings' disabled={!followState} onPress={()=>changeToFollowing()} />
      </View> */}
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
      <UserList />
    </View>
  )
}