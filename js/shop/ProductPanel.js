'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  ListView,
  Image
} from 'react-native';





export default class ProductPanel extends React.Component {
	render() {
	
		return (
		
			<View>
			<View style={styles.container}>
			
				<Image
						source={require('./images/product/cart.png')}
						style={styles.cart}

				/>

			</View>
			
			</View>
		
		);
	
	}


}



var styles = StyleSheet.create({
  container: {
    height: 60,
		backgroundColor: '#365F4E',
		alignItems: 'center',
		flexDirection: 'row',
		position:'relative',
		bottom:0

  },
	cart: {
		position: 'absolute',
		height:70,
		width:70,
		bottom:15,
		right:20,
		
	},
	
	
	
	
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565',

  }


});
