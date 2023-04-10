import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import GalleryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import { auth } from '../Firebase/firebase-setup';
import Icon from '../components/Icon';
import { getProfileById } from '../Firebase/helper';
import { AntDesign } from '@expo/vector-icons';

export default function Gallery({ navigation, route }) {
  const [headUrl, setHeadUrl] = useState(null);
  useEffect(()=>{
    (async()=>{
      const profile = await getProfileById(route.params.item.userId);
      setHeadUrl((prev)=>profile.headPhoto);
    })();
  },[])

  function convertTimestamp(timestamp) {
    const date = new Date(timestamp);
    // const output = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
    const output = date.toDateString();
    return output;
  }

  return (
    <SafeAreaView style={styles.container}>
      <PressableButton customizedStyle={styles.userInfoContainer} buttonPressed={route.params.item.userId === auth.currentUser.uid ? ()=>navigation.navigate('Profile') : ()=>navigation.navigate('Third Profile', {id:route.params.item.userId, name:route.params.item.userName})}>
        <Icon size={60} source={headUrl} />
        <View style={styles.infoTextContainer}> 
            <Text style={styles.title}>{route.params.item.userName} </Text> 
            <Text style={styles.mediumFont}>@ {route.params.item.location[1]}</Text>
        </View>
      </PressableButton>
      <View style={styles.galleryContainer}>
        <GalleryBox galleryItem={route.params.item.photos}/>
      </View>
      <View style={styles.diaryInfoContainer}>
        <Text style={styles.storyText}>{route.params.item.description}</Text>
        <Text style={styles.detailText}>#{route.params.item.species} <Text>@{route.params.item.location[1]} </Text></Text>
        <View style={styles.timeLine}>
          <Text>{convertTimestamp(route.params.item.date[0])}</Text>
          <Text><AntDesign name="hearto" size={15} color="black" /> {route.params.item.like}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  userInfoContainer: {
    flexDirection:"row",
    justifyContent: 'flex-start',
    margin: 10,
  },
  infoTextContainer: {
    marginLeft: 10,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 800,
  },
  lightFont: {
    color: 'rgb(50,50,50)',
  },
  mediumFont: {
    fontWeight: 600,
    color: 'rgb(50,50,50)',
  },
  diaryInfoContainer: {
    margin: 10,
  },
  galleryContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  timeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  storyText: {
    fontSize: 15,
    fontWeight: 600,
  },
  detailText: {
    fontSize: 12,
  },
})