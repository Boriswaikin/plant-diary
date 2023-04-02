import { View, Text, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { mapsApi }  from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function LocationManager() {

    const [location, setLocation] = useState();
    const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
    const navigation = useNavigation();
    const route = useRoute();


    useEffect(()=>{
        if (route.params) {
            setLocation(route.params.selectedLocation);
            // console.log(location);
        }
    },[route])

    async function verifyPermission() {
        // console.log(permissionInfo);
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
            const newLocation = await Location. getCurrentPositionAsync();
            setLocation({latitude:newLocation.coords.latitude,longitude:newLocation.coords.longitude});
            console.log(location);
        }
        catch (err) { console.log(err); }
        }

  return (
    <View>
      <Button title="Locate Me!" onPress={locateUserHandler} />
      <Button title="Go to Map!" onPress={()=>{navigation.navigate('Map',{currentLocation: location})}} />
      {location && <Image source={{uri:`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApi}`}} style={{width:450, height:300}}/>}
    </View>
  )
}