import { View, FlatList, Image, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";


function GallaryImage({ postImage }) {
  
  const { width } = useWindowDimensions();
  const postWidth = width;
  const [url, setUrl] = useState(null);

  useEffect(()=>{
    async function getImageUrl() {
      try {
      const reference = ref(storage, postImage);
      const uri = await getDownloadURL(reference);
      setUrl(uri)
      } catch (err) {
        console.log(err);
      }
    }
    getImageUrl();
  },[])

  return (
    <View>
      {url&&<Image
        source={{ uri: url }}
        style={{ width: postWidth, height: postWidth, marginTop:20, }}
      />}
    </View>
  );
}

export default function GallaryBox({galleryItem}) {
  const [currentImage, setCurrentImage] = useState(0);
  const itemChanged = useRef((item) => {
    // console.log(item);
    const numberOfPost = typeof item.viewableItems[0]!=='undefined'?item.viewableItems[0].index:0;
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
          return <GallaryImage postImage={item.uri}></GallaryImage>;
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
                margin:3,
                backgroundColor: index === currentImage ? "blue" : "gray",
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
