import { View, Text, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { followUser, getFollowerByUser, getFollowingByUser, unfollowUser } from '../Firebase/helper';
import Icon from '../components/Icon';
import PressableButton from '../components/PressableButton';
import { auth } from '../Firebase/firebase-setup';

export default function Follow({ navigation, route }) {

  const [following, setFollowing] = useState(null);
  const [follower, setFollower] = useState(null);
  const [localFollowing, setLocalFollowing] = useState(null);
  const [followState, setFollowState] = useState(route.params.followState);

  useEffect(()=>{
    (async()=>{
      if (followState) {
      const followerList = await getFollowerByUser(route.params.id);
      setFollower((prev)=>followerList);
      } else {
      const followingList = await getFollowingByUser(route.params.id);
      setFollowing((prev)=>followingList);
      }
      const localFollowingList = await getFollowingByUser(auth.currentUser.uid);
      setLocalFollowing((prev)=>localFollowingList);

    })();
  },[]);

  async function pressFollow(item) {
    console.log('Follow user', item.uid);
    await followUser(item.uid);
    setLocalFollowing((prev)=>[...prev, item]);
  }

  async function pressUnfollow(id) {
    console.log('Unfollow user', id);
    await unfollowUser(id);
    setLocalFollowing((prev)=>prev.filter(item => item.uid !== id));
  }

  return (
    <SafeAreaView style={styles.container}>
      {((followState&&follower)||(!followState&&following))&&<FlatList
      data={followState?follower:following}
      renderItem={({item})=>{
        return (
          <View style={styles.userContainer}>
            <View style={styles.headName}>
              <View style={styles.icon}>
                <Icon size={65} source={item.headPhoto}/>
              </View>
              <View style={styles.nameInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.mediumFont}>@{item.email}</Text>
              </View>
            </View>
            {localFollowing&&!localFollowing.some(person => person.uid === item.uid) 
            ?<PressableButton customizedStyle={styles.editToggleButton} buttonPressed={()=>pressFollow(item)}>
              <Text style={styles.editToggleText}>Follow</Text>
            </PressableButton>
            :<PressableButton customizedStyle={styles.editButton} buttonPressed={()=>pressUnfollow(item.uid)}>
              <Text style={styles.editText}>Following</Text>
            </PressableButton>
            }
          </View>
        )
      }}
      />}
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