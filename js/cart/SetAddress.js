
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
	ListView,
} from 'react-native';


import * as GLOBAL from '../config/Global';
import AddAddress from './AddAddress';

export default class SetAddress extends Component {

	constructor(props){
		super(props);
		this.state = ({
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},
			dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		
		});
		

	}
	
	
	componentDidMount() {
		this._loadInit();
	}
	
	
	
	_loadInit(){
		Alert.alert(
			'暂无地址',
			 null,
		  [
			 {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			 {text: '添加新地址', onPress: () => console.log('OK Pressed')},
			]
);
	
	
	}
	
	

	
	



	
	_addAddress(){
	
		this.props.navigator.push({
			component: AddAddress,
			title: '新建收获地址',
		});
	
	}



	render(){
	
		return (
		
			<View>
				
			</View>
		
		
		);
	
	
	}


}