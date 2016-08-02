/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
	StatusBar,
} from 'react-native';





import MainScreen from './MainScreen';



class rp extends Component {
  render() {
    return (

   
    <NavigatorIOS
			style={styles.container}
			barTintColor='#fff'
			titleTextColor='#555'
			tintColor='#555'
    	initialRoute={{
				title:'',
       	component: MainScreen,
				navigationBarHidden: true,
				
			}}/>


//		<MainScreen/>
		

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

AppRegistry.registerComponent('rp', () => rp);
