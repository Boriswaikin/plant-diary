import { View, FlatList, Image, useWindowDimensions } from "react-native";
import React, { useRef, useState } from "react";

const itemData = [
  {
    id: "1",
    postImage:
      "https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Twitter-icon.png",
  },
  {
    id: "2",
    postImage:
      "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
  {
    id: "3",
    postImage:
      "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
  {
    id: "4",
    postImage:
      "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
];

function Gallary({ postImage }) {
  const { width } = useWindowDimensions();
  const postWidth = width;
  return (
    <View>
      <Image
        source={{ uri: postImage }}
        style={{ width: postWidth, height: postWidth }}
      />
    </View>
  );
}

export default function GallaryBox() {
  const [currentImage, setCurrentImage] = useState(0);
  const itemChanged = useRef((item) => {
    const numberOfPost = item.viewableItems[0].index;
    setCurrentImage(numberOfPost);
  });
  return (
    <View>
      <FlatList
        data={itemData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Gallary postImage={item.postImage}></Gallary>;
        }}
        onViewableItemsChanged={itemChanged.current}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {itemData.map((item, index) => {
          return (
            <View
              key={item.id}
              style={{
                width: 7,
                height: 7,
                borderRadius: 8,
                marginRight: 2,
                backgroundColor: index === currentImage ? "blue" : "gray",
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
