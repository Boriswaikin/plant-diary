import { View, Text, FlatList, StyleSheet } from "react-native";
import Color from "./Color";
import React from "react";
import PressableButton from "./PressableButton";
import CardComponent from "./CardComponent";
import Icon from "./Icon";

function UserItem({ UserItem }) {
  return (
    <View>
      <CardComponent
        flexDirection="row"
        width={500}
        height={80}
        radius={20}
        marginBottom={15}
        color={Color.headerTabColor}
      >
        <PressableButton
          customizedStyle={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
          buttonPressed={() => {}}
        >
          <View
            style={{
              width: 100,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Icon
              width={50}
              height={50}
              borderRadius={25}
              borderColor="transparent"
              source={UserItem.postImage}
            />
            <Text style={{ textAlign: "center" }}>{UserItem.name}</Text>
          </View>
          <PressableButton
            customizedStyle={{
              width: 60,
              height: 30,
              backgroundColor: "gray",
            }}
            buttonPressed={() => {}}
          >
            <Text style={{ color: "white" }}>Remove</Text>
          </PressableButton>
        </PressableButton>
      </CardComponent>
    </View>
  );
}

export default function UserList({itemData}) {
  // const itemData = [
  //   {
  //     id: "1",
  //     postImage:
  //       "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
  //     name: "Peter",
  //   },
  // ];

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
