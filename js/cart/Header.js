'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  AlertIOS,
  NavigatorIOS,
} from 'react-native';




export default class Header extends Component {

  constructor(props){
	super(props);
	this.state = {
			};
  }
	




	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>购物车 </Text>
			</View>

     );
	 }
}







const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: Platform.OS === 'ios' ? 20 : 0,

		backgroundColor: '#FFF',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',

	},
	title: {
		flex: 1,
		textAlign: 'center',
		color: '#555',
		fontSize: 20,
		paddingBottom: 10,
	
	}

});












