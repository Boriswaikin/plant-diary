import { View, Text, FlatList,StyleSheet,Image, useWindowDimensions } from 'react-native'
import React,{useRef, useState} from 'react'
import Color from './Color';

const itemData = [
    {
      id:'1',
      postImage:
              "https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Twitter-icon.png"
          },
    {
      id:'2',
        postImage:
                "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png"
            },
      {
        id:'3',
        postImage:
                  "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png"
              },
        {
          id:'4',
          postImage:
                  "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png"
              },
  ];

function Gallary({postImage}) {
  const {width} = useWindowDimensions();
  const postWidth= width;
  return <View>
      <Image
        source={{uri:postImage}}
        style={{width:postWidth,height:postWidth}}/>
  </View>
}  

