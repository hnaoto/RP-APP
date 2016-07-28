
'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  TouchableHighlight,
	TouchableOpacity,
	AsyncStorage,
	Alert,
} from 'react-native';


export default class ConfigView extends Component {

	_logoutOnPress() {
		Alert.alert(
			'确定退出登录',
			 null,
		  [
			 {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			 {text: '确定', onPress: () => console.log('OK Pressed')},
			]
		);
	}
	
	render(){
    return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this._logoutOnPress() }>
          <Text style={styles.buttonText}>退出登录</Text>
				</TouchableOpacity>
			</View>
		);
	}
}





var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F8F8F8',
		flex: 1,
		flexDirection: 'column',
	},
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
	button: {
		marginTop:90,
    height: 36,
    backgroundColor: '#69A44A',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
	},

});