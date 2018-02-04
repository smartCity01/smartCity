import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTab } from './src/Components/BottomTab';
import { TabNavigator } from 'react-navigation';
import { HomePage } from './src/Components/HomePage';
export default (MainScreenNavigator = TabNavigator(
  {
    Home: {
      screen: HomePage 
    },
    School: {
      screen: HomePage 
    },
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
