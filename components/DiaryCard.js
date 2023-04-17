import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CardComponent from "./CardComponent";
import Grid from "./Grid";
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

  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  return (
    <CardComponent>
      <View style={styles.imageContainer}>
        <StorageImage source={item.photos[0]} size={150} />
        <Grid items={item.photos} />
      </View>
      <View style={styles.diaryInfoLine}>
        <Text numberOfLines={1} style={[styles.mediumFont, styles.singleLine]}>{item.userName}<Text style={styles.lightFont}> #{item.species}</Text><Text style={styles.lightFont}> @{item.location[1]}</Text></Text>
        <PressableButton buttonPressed={()=>{pressLike()}}>
          <Text style={styles.likeCount}>{item.like} <AntDesign name={!like?"hearto":"heart"} color={like?"green":"black"} size={15}></AntDesign></Text>
        </PressableButton>
      </View>
      <Text style={styles.timeText}>{timeSince(item.date[0])} ago</Text>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  mediumFont: {
    fontWeight: 600,
    // color: 'rgb(50,50,50)',
  },
  lightFont: {
    fontWeight: 400,
    // color: 'rgb(50,50,50)',
  },
  diaryInfoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  likeCount: {
    fontSize: 15,
    // color: 'rgb(50,50,50)',
  },
  timeText: {
    fontSize: 13,
    color: 'rgb(100,100,100)',
  },
  singleLine: {
    width: 250,
  },
})
