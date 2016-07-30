

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




import Content from './content';
import * as GLOBAL from '../config/Global';



export default class HomePage extends React.Component {
	
	
	componentDidMount() {
			
		//this._loadAllProducts();
	
	}
	
	



	_loadAllProducts() {
	
		fetch(GLOBAL.ALL_PRODUCT_URL, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(
			(responseData) => {
				console.log(responseData);
			}
		)
		.catch(error =>
			this.setState({
				message: '系统故障，请稍后重试' + error
		}));
		

	}
	
	
	async _saveItem(data){
		try {
			await AsyncStorage.setItem('ALL_Products', JSON.Stringify(data));
		} catch (error) {
			// Error saving data
		}
	}
	
	
	



	
	
  render() {
    return (
		
    
    <NavigatorIOS
			style={styles.container}
			barTintColor='#fff'
			titleTextColor='#999'
			tintColor='#555'
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


