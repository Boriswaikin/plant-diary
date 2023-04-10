import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from "react-native-maps";
import PressableButton from '../components/PressableButton';

export default function Map({ navigation, route }) {
    const[location, setLocation] = useState(null);

  return (
    <View style={styles.container}>
        <MapView 
        style={styles.map}
        initialRegion={{
            latitude: route.params&&route.params.currentLocation?route.params.currentLocation.latitude:49.2805928,
            longitude: route.params&&route.params.currentLocation?route.params.currentLocation.longitude:-123.1157184,
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
        <PressableButton disabled={!location} customizedStyle={location?styles.button:styles.disabledButton} buttonPressed={()=>{
            navigation.navigate('Create', {selectedLocation:location});
        }}>
          <Text style={location?styles.buttonText:styles.disabledText}>Confirm your location!</Text>
        </PressableButton>
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
    button: {
      borderWidth: 1,
      borderRadius: 20,
      padding: 10,
      width: 300,
      backgroundColor: 'white',
    },
    disabledButton: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: 'gray',
      padding: 10,
      width: 300,
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
    disabledText: {
      fontSize: 16,
      color: 'rgb(100,100,100)',
    },
    buttonText: {
      fontSize: 16,
      color: 'black',
    },
  });