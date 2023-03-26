import { View, FlatList, StyleSheet } from "react-native";
import Color from "./Color";
import React from "react";
import UserItem from "./UserItem";

export default function UserList() {
  const itemData = [
    {
      id: "1",
      postImage:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
      name: "Peter",
    },
  ];

  return (
    <View style={styles.bottomContaineer}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={itemData}
        renderItem={({ item }) => {
          return <UserItem UserItem={item} UserItemPressed={() => {}} />;
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  bottomContaineer: {
    flex: 4,
    backgroundColor: Color.contentColor,
  },
  contentContainerStyle: {
    alignItems: "center",
    marginTop: 25,
  },
});
