import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import GalleryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import { auth } from '../Firebase/firebase-setup';
import Icon from '../components/Icon';
import { getProfileById } from '../Firebase/helper';

export default function Gallery({ navigation, route }) {
  const [headUrl, setHeadUrl] = useState(null);
  useEffect(()=>{
    (async()=>{
      const profile = await getProfileById(route.params.item.userId);
      setHeadUrl((prev)=>profile.headPhoto);
    })();
  },[])

  return (
    <SafeAreaView>
        <View style={styles.container1}>
        <View style={styles.container2}>
        <Icon size={60} source={headUrl} />
        {route.params.item.userId === auth.currentUser.uid ?
        <PressableButton buttonPressed={()=>navigation.navigate('Profile')}> 
            <Text style={styles.text1}>{route.params.item.userName} </Text> 
            <Text style={styles.text2}>{route.params.item.location[1]}</Text>
        </PressableButton> :
        <PressableButton buttonPressed={()=>navigation.navigate('Third Profile', {id:route.params.item.userId, name:route.params.item.userName})}> 
            <Text style={styles.text1}>{route.params.item.userName} </Text> 
            <Text style={styles.text2}>{route.params.item.location[1]}</Text>
        </PressableButton>
        }
        </View>
      </View>
      <View style={styles.galleryContainer}>
        <GalleryBox galleryItem={route.params.item.photos}/>
      </View>
      <Text>species: {route.params.item.species}</Text>
      <Text>location: {route.params.item.location[1]}</Text>
      <Text>story: {route.params.item.description}</Text>
      <Text>date: {route.params.item.date[0]}</Text>
      <Text>like: {route.params.item.like}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container1: {
    // flex: 1,
    flexDirection:"row",
    justifyContent:"space-between"
    // textAlign: 'center',
    // alignItems: 'center',
  },
  container2: {
    flexDirection:"row",
  },
  container3: {
    // flexDirection:"row",
    justifyContent:'center',
  },
  text1:{
    marginLeft:1,
    marginTop:10,
    textAlign:'left'
  },
  text2:{
    marginLeft:20,
    marginTop:10,
    textAlign:'left'
  },
  galleryContainer: {
    // flex: 1,
    // justifyContent: 'center',
  }
})