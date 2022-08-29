import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Button } from "@react-native-material/core";
// import firebase from './database/firebase';
// import {ref,set} from 'firebase/database';
// import db from '..firebase';
import { ref, set, update, onValue, remove } from "firebase/database";


const Welcome = ({ navigation }) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );
  const[Latitude,setLatitude] = useState('latitude');
  const[Longitude,setLongitude] = useState('longitude');

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();
    
    if (coords) {
      const { latitude, longitude } = coords;
      setLatitude(latitude);
      setLongitude(longitude);
      let response = await Location.reverseGeocodeAsync({
        
        latitude,
        longitude,
      });
      // latitude = 14.876478;
      // longitude = 102.0157481;
      console.log(latitude, longitude);
      for (let item of response) {
        // console.log(item)
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

        setDisplayCurrentAddress(address);

        if (address.length > 0) {
          setTimeout(() => {
            navigation.navigate('Home', { item: address });
          }, 2000);
        }
      }
    }

  function create(){
      set(ref(db,'user/'),{
        user:"noom",
        long:"long"
      })
    }

      
  
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('../assets/geo.png')} style={styles.image} />
        <Text style={styles.title}>What's your address?</Text>
      </View>
      <Text style={styles.text}>Nnn</Text>
      <Text style={styles.text}>{displayCurrentAddress}</Text>
      <Text style={styles.text}>Latitude : {Latitude}</Text>
      <Text style={styles.text}>Longitude : {Longitude}</Text>
      {/* <Button name = 'Ok' color='white'/> */}
      <Text style={styles.text}></Text>
      {/* <Button title="Sent" color='white' onPress={() => create()}/> */}
      <Button title="Click Me" color='white' onPress={() => alert("🎉🎉🎉")}/>
    </View>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    paddingTop: 130,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FD0139',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
});

export default Welcome;