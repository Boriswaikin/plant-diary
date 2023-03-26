import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";

const Grid = (props) => {
  const itemData = [
    {
      icon: (
        <Image
          style={styles(props).imageIcon}
          source={{
            uri: "https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Twitter-icon.png",
          }}
        />
      ),
    },
    {
      icon: (
        <Image
          style={styles(props).imageIcon}
          source={{
            uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
          }}
        />
      ),
    },
    {
      icon: (
        <Image
          style={styles(props).imageIcon}
          source={{
            uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
          }}
        />
      ),
    },
    {
      icon: (
        <Image
          style={styles(props).imageIcon}
          source={{
            uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
          }}
        />
      ),
    },
  ];

  return (
    <View style={styles(props).container}>
      <FlatList
        data={itemData}
        numColumns={props.numColumns}
        renderItem={({ item }) => {
          return <View style={styles(props).item}>{item.icon}</View>;
        }}
      />
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    container: {
      width: props.width,
      alignSelf: props.alignSelf,
      marginTop: props.marginTop,
      marginRight: props.marginRight,
    },

    item: {
      flex: 1,
      alignItems: "flex-start",
      padding: 5,
    },
    imageIcon: {
      width: props.width / props.numColumns,
      height: props.width / props.numColumns,
    },
  });

export default Grid;
