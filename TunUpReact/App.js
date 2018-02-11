import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTab } from './src/Components/BottomTab';
import { TabNavigator } from 'react-navigation';
import { HomePage } from './src/Components/HomePage';
import { LocationsPage } from './src/Components/LocationsPage';
import { SignUp} from './src/Components/SignUp';
export default (MainScreenNavigator = TabNavigator(
 {
   Home: {
     screen: HomePage
   },
   Locations: {
     screen: LocationsPage
   },
   SignUp: {
     screen: SignUp
   }
 },
 {
   tabBarPosition: "bottom",
   tabBarComponent: props => {
     return (
       <BottomTab navigator={props}>
         </BottomTab>
     );
   }
 }
));

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
