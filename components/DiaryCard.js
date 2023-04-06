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
  const [liked,setLiked]=useState(like);

  async function pressLike() {
    if (liked) {
      await removeLike(item.diaryId);
      setLiked(false);
    } else {
      await addLike(item.diaryId);
      setLiked(true);
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
        <StorageImage size={135} source={item.photos[0]} />
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
      <AntDesign  name={!liked?"hearto":"heart"} color={liked?"red":"black"} size={22}></AntDesign>
      </PressableButton>
      </View>
    </CardComponent>
  );
}
