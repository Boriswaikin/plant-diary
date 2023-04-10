import { View, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import StorageImage from "./StorageImage";

export default function Grid ({items}) {
  const tempData = items.length>1?items.slice(1,5):null;
  const numberOfColumns = tempData?.length>1?2:1;
  return (
    <View>
      {tempData&&<FlatList
        data={tempData}
        key={tempData?.length}
        numColumns={tempData?.length>1?2:1}
        ItemSeparatorComponent={() => <View style={{height: 4}} />}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => {
          return (
            <StorageImage size={numberOfColumns===1?150:73} source={ item } />)
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
