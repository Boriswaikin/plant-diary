import { View, Text, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserList from '../components/UserList';
import { getFollowerByUser, getFollowingByUser } from '../Firebase/helper';
import Icon from '../components/Icon';
import PressableButton from '../components/PressableButton';
import { auth } from '../Firebase/firebase-setup';

export default function Follow({ navigation, route }) {

  // const [users, setUsers] = useState([{uid:1314, name:'hana', headPhoto:'head-url-1'},{uid:1315, name:'john', headPhoto:'head-url-2'},{uid:1316, name:'peter', headPhoto:'head-url-3'}]);
  const [following, setFollowing] = useState([{uid:1314, name:'hana', headPhoto:'head-url-1'},{uid:1315, name:'john', headPhoto:'head-url-2'},{uid:1316, name:'peter', headPhoto:'head-url-3'}]);
  const [follower, setFollower] = useState([{uid:1317, name:'zoo', headPhoto:'head-url-1'},{uid:1318, name:'ham', headPhoto:'head-url-2'},{uid:1316, name:'peter', headPhoto:'head-url-3'}]);
  const [localFollowing, setLocalFollowing] = useState([{uid:1314, name:'hana', headPhoto:'head-url-1'},{uid:1315, name:'john', headPhoto:'head-url-2'},{uid:1316, name:'peter', headPhoto:'head-url-3'}]);
  const [followState, setFollowState] = useState(route.params.followState);

  // useEffect(()=>{
  //   (async()=>{

  //     console.log("get follower",route.params.id);
  //     const followerList = await getFollowerByUser(route.params.id);
  //     setUsers((prev)=>followerList);

  //     console.log("get following",route.params.id);
  //     const followingList = await getFollowingByUser(route.params.id);
  //     setUsers((prev)=>followingList);

  //     console.log("get local following",auth.currentUser.uid);
  //     const localFollowingList = await getFollowingByUser(auth.currentUser.uid);
  //     setUsers((prev)=>localFollowingList);

  //   })();
  // },[]);

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
    <SafeAreaView style={styles.container}>
      <FlatList
      data={followState?follower:following}
      renderItem={({item})=>{
        return (
          <View style={styles.userContainer}>
            <View style={styles.headName}>
              <View style={styles.icon}>
                <Icon width={65} height={65} borderRadius={65} source={"https://ui-avatars.com/api/?name=" + item.headPhoto}/>
              </View>
              <View style={styles.nameInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.mediumFont}>@{item.uid}</Text>
              </View>
            </View>
            {!localFollowing.some(person => person.uid === item.uid) 
            ?<PressableButton customizedStyle={styles.editToggleButton} buttonPressed={()=>pressFollow(item.uid)}>
              <Text style={styles.editToggleText}>Follow</Text>
            </PressableButton>
            :<PressableButton customizedStyle={styles.editButton} buttonPressed={()=>pressUnfollow(item.uid)}>
              <Text style={styles.editText}>Following</Text>
            </PressableButton>
            }
          </View>
        )
      }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
  },
  nameInfo: {
    margin: 10,
  },
  headName: {
    flexDirection: 'row',
  },
  editButton: {
    borderRadius: 5,
    padding: 2,
    width: 100,
    height: 26,
    backgroundColor: 'rgb(220,220,220)',
    alignSelf: 'center',
  },
  editText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 600,
  },
  editToggleButton: {
    borderRadius: 5,
    padding: 2,
    width: 80,
    height: 26,
    backgroundColor: 'rgb(100,100,100)',
    alignSelf: 'center',
  },
  editToggleText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 600,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  lightFont: {
    color: 'rgb(50,50,50)',
  },
  mediumFont: {
    fontWeight: 400,
    color: 'rgb(50,50,50)',
  },
})