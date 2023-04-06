import { View, Text, FlatList, Button, Pressable, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { followUser, getDiaryQueueByUser, getProfileById, unfollowUser } from '../Firebase/helper';
import { auth, firestore } from '../Firebase/firebase-setup';
import { signOut } from 'firebase/auth';
import { doc, onSnapshot, query } from 'firebase/firestore';
import PressableButton from '../components/PressableButton';
import Icon from '../components/Icon';
import { checkFollowingRelation } from '../Firebase/helper';

const w = Dimensions.get('window').width;

export default function Profile({ navigation, route }) {
  const [profile, setProfile] = useState(null);
  const [id, setId] = useState("");
  const [diaries, setDiaries] = useState(null);
  const [self, setSelf] = useState(true);
  const [following, setFollowing] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect( ()=>{
      (async()=>{
        if (route.name === "Third Profile") {
        setId(route.params.id);
        setSelf(false);
        navigation.setOptions({
          title: profile && profile.name || "User Profile",
        })
        const ifFollowing = await checkFollowingRelation(route.params.id);
        setFollowing(ifFollowing);
      } else {
        setId(auth.currentUser.uid);
      }
    }
    )();
  },[])

  useEffect (()=>{
    const unsubscribe1 = onSnapshot(doc(firestore, "profile", route.params && route.params.id || auth.currentUser.uid), (doc) => {
      setProfile(doc.data());
    });
    return () => {
      unsubscribe1();
    };
  },[])

  useEffect(()=>{
    const diaryListqueue = getDiaryQueueByUser(route.params && route.params.id || auth.currentUser.uid)
    const unsubscribe2 = onSnapshot(diaryListqueue, (querySnapshot) => {
      if (!querySnapshot.empty) {
        let diaries = [];
        querySnapshot.docs.forEach((doc) => {
          diaries.push({ ...doc.data(), diaryId: doc.id });
        });
        setDiaries(diaries);
      }
    });
    return () => {
      unsubscribe2();
    };
  },[])

  async function pressFollow() {
    // followUser(selfId,thirdId);
    await followUser(id);
    setFollowing(true);
    console.log('Follow user');
  }

  async function pressUnfollow() {
    // unfollowUser(selfId,thirdId);
    await unfollowUser(id);
    setFollowing(false);
    console.log('Unfollow user');
  }

  function toggleEdit() {
    setEdit((prev)=>!prev);
  }

  return (
    <SafeAreaView style={styles.container}>
      {profile&&
      <View>
        <View style={styles.profileContainer}>
          {/* <Text>User head photo: {profile.headPhoto}</Text> */}
          <Icon width={100} height={100} borderRadius={100} source={profile.headPhoto} />
          <View style={styles.profileInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{profile.name}</Text>
            {self&&<PressableButton customizedStyle={styles.editButton} buttonPressed={()=>navigation.navigate('Edit Profile',{profile: profile})}>
              <Text style={styles.editText}>Edit Profile</Text>
            </PressableButton>}
          </View>
          <Text style={styles.lightFont}>Diaries: <Text style={styles.mediumFont}>{profile.postCount}</Text></Text>
          <Pressable onPress={()=>navigation.navigate('Follow', {screen: 'Follower', id: id, name: profile.name})}><Text style={styles.lightFont}>Follower: <Text style={styles.mediumFont}>{profile.followerCount}</Text></Text></Pressable>
          <Pressable onPress={()=>navigation.navigate('Follow', {screen: 'Following', id: id, name: profile.name})}><Text style={styles.lightFont}>Following: <Text style={styles.mediumFont}>{profile.followingCount}</Text></Text></Pressable>
          </View>
        </View>
        {profile.achievement&&
        <View style={styles.achievementContainer}>
          {/* <Text style={styles.achievementText}>Achievement</Text> */}
          <View>
          <FlatList 
          horizontal={true}
          data={profile.achievement}
          renderItem={({item})=>{
            return (
              <View style={styles.icon}>
              <Icon width={80} height={80} borderRadius={80} source={"https://ui-avatars.com/api/?name=" + item}/>
              </View>
            )
          }}
          />
          </View>
        </View>
        }
      </View>
      }
      {self&&diaries&&
      <View style={styles.editDiariesLine}>
        <PressableButton customizedStyle={edit?styles.editToggleButton:styles.editButton} buttonPressed={()=>toggleEdit()}>
          {edit ? <Text style={styles.editToggleText}>Finish Edit</Text> : <Text style={styles.editText}>Edit Diaries</Text>}
        </PressableButton>
      </View>
      }
      
      <View style={styles.gridContainer}>
        {/* <Text>Diary Grid</Text> */}
        {diaries&&  <FlatList 
        data={diaries}
        numColumns={3}
        ItemSeparatorComponent={() => <View style={{height: 3}} />}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({item})=>{
          return (
            <PressableButton buttonPressed={()=>{edit?navigation.navigate('Edit Diary',{diary:item}):navigation.navigate('Gallery',{item:item})}}>
              <Image source={{uri: "https://ui-avatars.com/api/?name=" + item.species}} style={styles.gridImage} resizeMode='cover' />
            </PressableButton>
          )
        }}
         />
      }
      </View>
      <View style={styles.buttonContainer}>
      {self && 
      <PressableButton customizedStyle={styles.button} buttonPressed={()=>signOut(auth)}>
        <Text style={styles.buttonText}>Logout</Text>
      </PressableButton>
      }
      {!self && following && 
      <PressableButton customizedStyle={styles.button} buttonPressed={()=>pressUnfollow()}>
        <Text style={styles.buttonText}>Following</Text>
      </PressableButton>}
      {!self && !following && 
      <PressableButton customizedStyle={styles.button} buttonPressed={()=>pressFollow()}>
        <Text style={styles.buttonText}>Follow</Text>
      </PressableButton>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: 300,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'space-between',
  },
  gridContainer: {
    flex: 1,
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileInfo: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    rowGap: 2,
  },
  achievementContainer: {
    marginVertical: 10,
  },
  icon: {
    padding: 3,
  },
  achievementText: {
    fontWeight: 600,
    color: 'gray',
  },
  gridImage: {
    width: (w - 60) / 3,
    height:(w - 60) / 3,
  },
  columnWrapper: {
    gap: 3,
  },
  editButton: {
    borderRadius: 5,
    padding: 2,
    width: 80,
    height: 22,
    backgroundColor: 'rgb(220,220,220)',
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
    height: 22,
    backgroundColor: 'rgb(100,100,100)',
  },
  editToggleText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 600,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 10,
    // alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  editDiariesLine: {
    alignItems: 'flex-end',
  },
  lightFont: {
    color: 'rgb(50,50,50)',
  },
  mediumFont: {
    fontWeight: 600,
    color: 'rgb(50,50,50)',
  },
})