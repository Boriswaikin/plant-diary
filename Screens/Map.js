import { View, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from "react-native-maps";

export default function Map({ navigation, route }) {
    const[location, setLocation] = useState(null);

  return (
    <View style={styles.container}>
        <MapView 
        style={styles.map}
        initialRegion={{
            latitude: route.params?route.params.currentLocation.latitude:49.2805928,
            longitude: route.params?route.params.currentLocation.longitude:-123.1157184,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        onPress={(event) => {
            setLocation(event.nativeEvent.coordinate);
            console.log(event.nativeEvent);
        }}
        >
            {location && <Marker coordinate={{latitude:location.latitude,longitude:location.longitude,latitudeDelta:0.01,longitudeDelta:0.01}}></Marker>}
        </MapView>
        <View style={{margin:50}}>
        <Button title="Confirm your location!" disabled={!location} onPress={()=>{
            navigation.navigate('Create', {selectedLocation:location});
        }}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
        // flex: 1,
      ...StyleSheet.absoluteFillObject,
    },
  });