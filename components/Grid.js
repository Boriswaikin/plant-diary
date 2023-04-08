import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import StorageImage from "./StorageImage";

const Grid =({items}) => {
  
 
  // const numberOfColumns = 2;
  // console.log(numberOfColumns);
  
  const tempData = items.length>1?items.slice(1,5):null;
  const numberOfColumns = tempData?.length>1?2:1;
  // console.log(tempData);
  return (
    <View style={styles.container}>
      {tempData&&<FlatList
        data={tempData}
        key={tempData?.length}
        numColumns={tempData?.length>1?2:1}
        renderItem={({ item }) => {
          return (
          <View style={styles.item}>
            <StorageImage size={numberOfColumns===1?130:65} source={ item } />
          </View>)
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
