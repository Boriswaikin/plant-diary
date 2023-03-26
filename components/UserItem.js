import { View, Text } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import CardComponent from "./CardComponent";
import Icon from "./Icon";

export default function UserItem({ UserItem }) {
  return (
    <View>
      <CardComponent
        flexDirection="row"
        width={500}
        height={80}
        radius={20}
        marginBottom={15}
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
