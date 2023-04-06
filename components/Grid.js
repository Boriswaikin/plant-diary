import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";

const Grid = (props) => {
  
 
  // const numberOfColumns = 2;
  // console.log(numberOfColumns);
  
  const tempData = props.itemData.length>1?props.itemData.slice(1,4):null;
  const numberOfColumns = tempData?.length>1?2:1;
  return (
    <View style={styles(props).container}>
      {<FlatList
        data={tempData}
        numColumns={numberOfColumns}
        renderItem={({ item }) => {
          return <View style=
          {styles(props).item}>
            <Image style={numberOfColumns===1?styles(props).imageIcon1:styles(props).imageIcon2}
              source={{uri:item}}>
              </Image></View>;
        }}
      />}
    </View>
  );
};

const styles =
  StyleSheet.create({
    container: {
      alignItems:"flex-start",
      width: 130,
      marginTop: 15,
      marginRight: 30,
    },

    item: {
      paddingTop:5,
      paddingLeft:2,
      paddingRight:2,
    },
    imageIcon1: {
      width: 130,
      height: 130
    },
    imageIcon2: {
      width: 65,
      height: 65,
    },
  });

export default Grid;
