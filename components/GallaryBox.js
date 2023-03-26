import { View, Text, FlatList,StyleSheet,Image, useWindowDimensions } from 'react-native'
import React,{useRef, useState} from 'react'
import Color from './Color';


function Gallary({postImage}) {
  const {width} = useWindowDimensions();
  const postWidth= width;
  return <View>
      <Image
        source={{uri:postImage}}
        style={{width:postWidth,height:postWidth}}/>
  </View>
}  

