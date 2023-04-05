import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import GalleryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import { auth } from '../Firebase/firebase-setup';
import Icon from '../components/Icon';

export default function Gallery({ navigation, route }) {

  const itemData= route.params.imageUri;
  return (
    <View>
        <View style={styles.container1}>
        <View style={styles.container2}>
        <Icon
          size={60}
          source="https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png"
        />
        {route.params.item.userId === auth.currentUser.uid ?
        <PressableButton buttonPressed={()=>navigation.navigate('Profile')}> 
            <Text style={styles.text1}>{route.params.item.userName} </Text> 
            <Text style={styles.text2}>Location</Text>
        </PressableButton> :
        <PressableButton buttonPressed={()=>navigation.navigate('Third Profile', {id:route.params.item.userId, name:route.params.item.userName})}> 
            <Text style={styles.text1}>{route.params.item.userName} </Text> 
            <Text style={styles.text2}>Location</Text>
        </PressableButton>
        }
        </View>
                <PressableButton
          customizedStyle={{
            flexDirection: "row",
            marginRight:20,
            width: "10%",
          }}
          buttonPressed={()=>navigation.navigate('Edit Diary',{diary:route.params.item,uri:route.params.imageUri})}
        >
       <Text style={{ color: "black",fontSize:16, }}>Edit</Text>
      </PressableButton>
      </View>
        {/* <Text>[url][url][url][url]</Text> */}
        {/* <GalleryBox 
          itemData={route.params.imageuri}/> */}
          <GalleryBox galleryItem={itemData}/>
        <Text>species: {route.params.item.species}</Text>
        <Text>location: {route.params.item.location}</Text>
        <Text>story: {route.params.item.description}</Text>
        <Text>date: {route.params.item.date}</Text>
        <Text>like: {route.params.item.like}</Text>
    </View>
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
  }
})