// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { Button } from "@react-native-material/core";
// import { ref, set, update, onValue, remove ,getDatabase} from "firebase/database";
// import { db } from './config';
// import * as Location from 'expo-location';
// // import db from './config';
// // function storeHighScore(userId, score) {
// //   const db = getDatabase();
// //   const reference = ref(db, 'users/' + userId);
// //   set(reference, {
// //     highscore: score,
// //   });
// // }






// export default function App() {
//   function createData() {
//     set(ref(db, 'location/' ), {          
//       longitude: 'Noom',
//       latitude: 'email'  
//     }).then(() => {
//       console.log('createData');
//       // Data saved successfully!
//       alert('data updated!');    
//       })  
//       .catch((error) => {
//           // The write failed...
//           alert(error);
//       });
//       }
  
  
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       {/* <Button title="Click Me" color='white' onPress={storeHighScore('noom',20)}/> */}
//       <Button title="Click Me" color='white' onPress={createData()}/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

// Custom screens
import Welcome from './screens/Welcome';
// import Home from './sereen/Home';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerMode: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // <Text > Noom</Text>
  );
}