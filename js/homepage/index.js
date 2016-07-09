

// import Swiper from 'react-native-swiper'
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  AlertIOS,
  ScrollView,
  NavigatorIOS,
  TextInput,
  Platform
} from 'react-native';





import Content from './content';




export default class HomePage extends React.Component {
	
  render() {
    return (
    <NavigatorIOS
	  style={styles.container}
      initialRoute={{
        title: 'My View Title',
        component: Content,
		navigationBarHidden: true
	}}/>
	
	  
	);
  }
	
}



const styles = StyleSheet.create({
    text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});


