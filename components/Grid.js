import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";

const Grid =({itemData}) => {
  
 
  // const numberOfColumns = 2;
  // console.log(numberOfColumns);
  
  const tempData = itemData.length>1?itemData.slice(1,4):null;
  const numberOfColumns = tempData?.length>1?2:1;
  return (
    <View style={styles.container}>
      {<FlatList
        data={tempData}
        key={tempData?.length}
        numColumns={tempData?.length>1?2:1}
        renderItem={({ item }) => {
          return <View style=
          {styles.item}>
            <Image style={numberOfColumns===1?styles.imageIcon1:styles.imageIcon2}
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
