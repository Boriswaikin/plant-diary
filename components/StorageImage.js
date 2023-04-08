import { View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebase-setup';

export default function StorageImage({size, source, radius}) {
    const [url, setUrl] = useState(null);
    useEffect(()=>{
        async function getImageUrl() {
        try {
        const reference = ref(storage, source);
        setUrl(await getDownloadURL(reference));
        } catch (err) {
            console.log(err);
        }
        }
        getImageUrl();
    },[])
    
    return (
        <View>
        {url&&url!==''&&<Image
            source={{ uri: url }}
            style={{ width: size, height: size, borderRadius: radius?radius:0}}
        />}
        </View>
    );
}