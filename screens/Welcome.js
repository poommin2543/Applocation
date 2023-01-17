import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Button } from "@react-native-material/core";
import { ref, set, update, onValue, remove } from "firebase/database";
import { db } from '../config';

const Welcome = ({ navigation }) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );
  const[Latitude,setLatitude] = useState('latitude');
  const[Longitude,setLongitude] = useState('longitude');
  const[Altitude,setAltitude] = useState('altitude');
  var latitudedata = Latitude;
  var longitudedata = Longitude;
  var altitudedata = Altitude;
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
      console.log(coords);
      const { latitude, longitude , altitude} = coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setAltitude(altitude);
      let response = await Location.reverseGeocodeAsync({
        
        latitude,
        longitude,
        altitude,
      });
      // console.log(response);
      // latitude = 14.876478;
      // longitude = 102.0157481;
      console.log(latitude, longitude, altitude);
      for (let item of response) {
        // console.log(item)
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        setDisplayCurrentAddress(address);
        // if (address.length > 0) {
        //   setTimeout(() => {
        //     navigation.navigate('Home', { item: address });
        //   }, 2000);
        // }
      }
    }

  };
  console.log('createData');
  console.log(latitudedata);
  console.log(longitudedata);
  console.log(altitudedata);
  function createData() {
    set(ref(db, 'Rover1/location/user' ), {          
      longitude: longitudedata,
      latitude: latitudedata,
      altitude: altitudedata 
    }).then(() => {
      console.log('createData');
      // Data saved successfully!
      alert('data updated!');    
      })  
      .catch((error) => {
          // The write failed...
          alert(error);
      });
      }
      
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('../assets/geo.png')} style={styles.image} />
        <Text style={styles.title}>What's your address?</Text>
      </View>
      <Text style={styles.text}>Nnn</Text>
      <Button title="Update location" color='white' onPress={GetCurrentLocation}/>
      <Text style={styles.text}></Text>
      <Text style={styles.text}>{displayCurrentAddress}</Text>
      <Text style={styles.text}>Latitude : {Latitude}</Text>
      <Text style={styles.text}>Longitude : {Longitude}</Text>
      <Text style={styles.text}>Altitude : {Altitude}</Text>
      {/* <Button name = 'Ok' color='white'/> */}
      <Text style={styles.text}></Text>
      {/* <Button title="Sent" color='white' onPress={() => create()}/> */}
      <Button title="Sent Data" color='white' onPress={createData}/>
      
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