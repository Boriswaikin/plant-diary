import { View, Text } from "react-native";
import React, { useState } from "react";
import CardComponent from "./CardComponent";
import Grid from "./Grid";
import Color from "./Color";
import PressableButton from "./PressableButton";
import { AntDesign } from "@expo/vector-icons";
import StorageImage from "./StorageImage";
import { addLike, removeLike } from "../Firebase/helper";


export default function DiaryCard({item, like}) {

  async function pressLike() {
    if (like) {
      await removeLike(item.diaryId);
    } else {
      await addLike(item.diaryId);
    }
  }

  return (
    <CardComponent
      flexDirection="column"
      color={Color.headerTabColor}
      width={350}
      height={250}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{marginTop:20, marginLeft:20}}>
        <StorageImage source={item.photos[0]} size={135} />
        </View>
        <Grid
          items={item.photos}
        ></Grid>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "column" }}> 
          <Text>{item.userName}</Text>
        </View>
        <Text style={{ alignSelf: "center" }}>{item.description}</Text>
      </View>
      <View style={{ flexDirection: "row" ,justifyContent:"space-around"}}>
      <Text style={{ marginTop: 10, marginLeft: 40 }}>{item.species}</Text>
      <PressableButton
          customizedStyle={{
            flexDirection: "row",
            // justifyContent:,
            width: "10%",
          }}
          buttonPressed={()=>{pressLike()}}
        >
      <AntDesign  name={!like?"hearto":"heart"} color={like?"red":"black"} size={22}></AntDesign>
      </PressableButton>
      </View>
    </CardComponent>
  );
}
