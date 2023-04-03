import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";

const Grid = (props) => {
  
  const numberOfColumns = props.itemData.length>1?2:1;
  // const numberOfColumns = 2;
  // console.log(numberOfColumns);
  return (
    <View style={styles(props).container}>
      <FlatList
        data={props.itemData}
        numColumns={numberOfColumns}
        renderItem={({ item }) => {
          return <View style=
          {styles(props).item}>
            <Image style={numberOfColumns===1?styles(props).imageIcon1:styles(props).imageIcon2}
              source={{uri:item}}>
              </Image></View>;
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
      padding: 5,
    },
    imageIcon1: {
      width: props.width,
      height: props.width
    },
    imageIcon2: {
      width: props.width / 2,
      height: props.width / 2,
    },
  });

export default Grid;
