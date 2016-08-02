

// import Swiper from 'react-native-swiper'
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AlertIOS,
  ScrollView,
  NavigatorIOS,
  TextInput,
  Platform,
	AsyncStorage,
} from 'react-native';




import Content from './Content';



export default class Cart extends Component {
	

	
	
  render() {
    return (
		
    
    <NavigatorIOS
			style={styles.container}
			barTintColor='#fff'
			titleTextColor='#999'
			tintColor='#555'
    	initialRoute={{
				title:'',
       	component: Content,
				navigationBarHidden: true,
			}}/>
		);
  }
	
}



const styles = StyleSheet.create({
	text: {
	
  },
  container: {
    flex: 1,
		height: 30,
  }
});


