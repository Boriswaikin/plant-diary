import { View, Text, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { mapsApi }  from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as geofire from 'geofire-common';


export default function LocationManager({ locationHandler }) {

    const [location, setLocation] = useState();
    // const [street, setStreet] = useState();
    // const [hash, setHash] = useState();
    const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
    const navigation = useNavigation();
    const route = useRoute();


    useEffect(()=>{
        if (route.params&&route.params.selectedLocation) {
            (async ()=>{
                const street = await getStreet(route.params.selectedLocation);
                const hash = geofire.geohashForLocation([route.params.selectedLocation.latitude, route.params.selectedLocation.longitude]);
                setLocation({geohash:hash, street:street, ...route.params.selectedLocation});
                locationHandler([hash, street]);
            })();
        }
    },[route])


    async function getStreet(targetLocation) {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${targetLocation.latitude},${targetLocation.longitude}&sensor=true&key=${mapsApi}`)
        const json = await response.json();
        return json.results[0].address_components[1].short_name + ", " + json.results[0].address_components[3].short_name;
    }



    async function verifyPermission() {
        if (permissionResponse.granted) {
            return true;
        }
    
        try {
            const result = await requestPermission();
            console.log(result)
            return result.granted;
        } catch (err) {
            console.log(err);
        }
    }

    async function locateUserHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            Alert.alert("You need to give access to camera.");
            return;
        }

        try {
            const newLocation = await Location.getCurrentPositionAsync();
            const street = await getStreet({latitude:newLocation.coords.latitude,longitude:newLocation.coords.longitude});
            const hash = geofire.geohashForLocation([newLocation.coords.latitude, newLocation.coords.longitude]);
            setLocation({geohash: hash, street: street, latitude:newLocation.coords.latitude,longitude:newLocation.coords.longitude});
            locationHandler([hash, street]);
        }
        catch (err) { console.log(err); }
        }

  return (
    <View>
      <Button title="Locate Me!" onPress={()=>locateUserHandler()} />
      <Button title="Go to Map!" onPress={()=>{navigation.navigate('Map',{currentLocation: location})}} />
      {location&&location.street&&<Text>{location.street}</Text>}
      {location&&location.geohash&&<Text>{location.geohash}</Text>}
      {location&&<Image source={{uri:`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=800x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApi}`}} style={{width:450, height:150}}/>}
    </View>
  )
}