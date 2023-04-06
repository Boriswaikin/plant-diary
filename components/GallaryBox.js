import { View, FlatList, Image, useWindowDimensions } from "react-native";
import React, { useRef, useState } from "react";


function Gallary({ postImage }) {
  
  const { width } = useWindowDimensions();
  const postWidth = width;
  return (
    <View>
      <Image
        source={{ uri: postImage }}
        style={{ width: postWidth, height: postWidth, marginTop:20, }}
      />
    </View>
  );
}

export default function GallaryBox({galleryItem}) {
  const [currentImage, setCurrentImage] = useState(0);
  const itemChanged = useRef((item) => {
    const numberOfPost = item.viewableItems[0].index;
    setCurrentImage(numberOfPost);
  });
  const tempData = galleryItem.map((item, index) => ({ uri: item, id: `${index + 1}` }))
  return (
    <View>
      <FlatList
        data={tempData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Gallary postImage={item.uri}></Gallary>;
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
        {tempData.map((item, index) => {
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
