import { View, Text } from "react-native";
import React from "react";
import CardComponent from "./CardComponent";
import Grid from "./Grid";
import Color from "./Color";
import Icon from "./Icon";

export default function DiaryCard() {
  return (
    <CardComponent
      flexDirection="column"
      color={Color.headerTabColor}
      width={350}
      height={250}
      radius={20}
      marginBottom={15}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Icon
          width={120}
          height={100}
          marginTop={20}
          source="https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png"
        />
        <Grid
          numColumns={2}
          width={100}
          alignSelf="flex-end"
          marginTop={10}
          marginRight={40}
        ></Grid>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Icon
            width={40}
            height={40}
            borderRadius={20}
            source="https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png"
          />
          <Text>Name</Text>
        </View>
        <Text style={{ alignSelf: "center" }}>Random Text Story </Text>
      </View>
      <Text style={{ marginTop: 10, marginLeft: 40 }}>Species: Orchild</Text>
    </CardComponent>
  );
}
