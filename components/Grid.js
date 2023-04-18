import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import StorageImage from "./StorageImage";

export default function Grid ({items, size}) {
  const moreThanOne = items&&items.length > 1;
  return (
    <View style={{width:size, height:size}}>
      {moreThanOne&&<FlatList
        data={moreThanOne?items.slice(1,5):null}
        keyExtractor={item => item}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{height: 4}} />}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => {
          return (
            <StorageImage size={items.length===2?size:(size-4)/2} source={ item } />)
        }}
      />}
    </View>
  );
};

const styles =
StyleSheet.create({
  item: {
    paddingLeft:2,
    paddingRight:2,
  },
  columnWrapper: {
    gap: 4,
  },
});
