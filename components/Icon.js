import { View, Image } from "react-native";
import React from "react";
import StorageImage from "./StorageImage";

export default function Icon ({size, source}) {
  return (
    <View         
    style={{
      width: size,
      height: size,
    }}>
      {source&&source!==''&&
      <View>
        {source.slice(0,4)==='http'&&
        <Image source={{ uri:source }} style={{width:size,height:size,borderRadius:size}} />}
        {source.slice(0,4)==='imag'&&
        <StorageImage size={size} source={source} radius={size}/>}
        {source.slice(0,4)==='file'&&
        <Image source={{ uri:source }} style={{width:size,height:size,borderRadius:size}} />}
      </View>}
    </View>
  );
};
