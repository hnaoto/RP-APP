

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




export default class Account extends React.Component {




  render() {
    return (
		
    
    <NavigatorIOS
			style={styles.container}
			barTintColor='#fff'
			titleTextColor='#fff'
			tintColor='#999'
    	initialRoute={{
       	title: 'accountRoute',
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


