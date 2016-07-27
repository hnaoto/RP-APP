'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight
} from 'react-native';




export default class MenuButton extends Component {

	constructor(props) {
		super(props);
	}
	



	render() {

		return (
		
				<View style={styles.cell}>
					<Image style={styles.iconImg}  source={this.props.renderIcon}/>
					<Text style={styles.showText}>{this.props.showText}</Text>
				</View>
			
		
		);
	
	
	}




}


var styles = StyleSheet.create({
	cell: {
		flex:1,
		height: 52,
		alignItems: 'center'

	},
	iconImg: {
		width: 30,
		height: 30,
		marginBottom: 2,
	

	},
	showText: {
		fontSize: 12,
	
	}
});



