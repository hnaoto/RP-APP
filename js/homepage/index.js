

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
			barTintColor='#999'
			titleTextColor='#fff'
			tintColor='#fff'
    	initialRoute={{
       	title: 'initRoute',
       	component: Content,
				navigationBarHidden: true,
        passProps: {
					_hideNav: this.props._hideNav.bind(this),
					_showNav: this.props._showNav.bind(this),
				},
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


