import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import StorageImage from "./StorageImage";

export default function Grid ({items}) {
  const moreThanOne = items&&items.length > 1;
  return (
    <View style={styles.container}>
      {moreThanOne&&<FlatList
        data={moreThanOne?items.slice(1,5):null}
        keyExtractor={item => item}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{height: 4}} />}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => {
          return (
            <StorageImage size={items.length===2?150:73} source={ item } />)
        }}
      />}
    </View>
  );
};

const styles =
StyleSheet.create({
  container: {
    width: 150,
    height: 150,
  },
  item: {
    paddingLeft:2,
    paddingRight:2,
  },
  columnWrapper: {
    gap: 4,
  },
});
