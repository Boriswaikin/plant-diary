import { View, Text, Button, Image, StyleSheet,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { mapsApi }  from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as geofire from 'geofire-common';
import PressableButton from './PressableButton';



export default function LocationManager({ locationHandler, screenName, setLoadingLocation}) {

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
            Alert.alert("You need to give access to get the Location.");
            return;
        }

        try {
            setLoadingLocation(true);
            const newLocation = await Location.getCurrentPositionAsync();
            const street = await getStreet({latitude:newLocation.coords.latitude,longitude:newLocation.coords.longitude});
            const hash = geofire.geohashForLocation([newLocation.coords.latitude, newLocation.coords.longitude]);
            setLocation({geohash: hash, street: street, latitude:newLocation.coords.latitude,longitude:newLocation.coords.longitude});
            locationHandler([hash, street, newLocation.coords.latitude,newLocation.coords.longitude]);
        }
        catch (err) { console.log(err); }
        setLoadingLocation(false);
        }

  return (
    <View>
      {location&&location.street&&<Text style={styles.lightFont}>You are @ <Text style={styles.streetFont}>{location.street}</Text></Text>}
      {(location && screenName === "Create")&&<Image source={{uri:`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=800x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApi}`}} style={{width:'100%', height:150}}/>}
      <View style={styles.buttonContainer}>
        <PressableButton customizedStyle={styles.editButton} buttonPressed={()=>locateUserHandler()}>
          <Text style={styles.editText}>Locate Me!</Text>
        </PressableButton>
        {screenName === "Create" && 
        <PressableButton customizedStyle={styles.editButton} buttonPressed={()=>navigation.navigate('Map',{currentLocation: location})}>
          <Text style={styles.editText}>Go to Map!</Text>
        </PressableButton>}
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
      marginTop: 10,
      justifyContent: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 600,
      marginTop: 20,
    },
    inputContainer: {
      flex: 1,
    },
    buttonContainer: {
      justifyContent: "flex-end",
      flexDirection: "row",
      marginTop: 10,
      alignItems: "center",
    },
    editButton: {
      borderRadius: 5,
      padding: 2,
      margin: 5,
      width: 85,
      height: 22,
      backgroundColor: 'rgb(220,220,220)',
    },
    editText: {
      fontSize: 11,
      color: 'black',
      fontWeight: 600,
    },
    streetFont: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 600,
        color: 'rgb(50,50,50)',
        margin: 5,
    },
    lightFont: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 400,
        color: 'rgb(100,100,100)',
        margin: 5,
    },
  })