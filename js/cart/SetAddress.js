
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
	
		this.props.navigator.push() {
			component: AddAddress,
			title: '新建收获地址',
		}
	
/**
		http.get(GLOBAL.ALL_ORDER_URL, this.state.headers, function(data){
			console.log(data);
			if (data !=null){
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(data),
				});
			}
			
		});
**/
		
		
		
		fetch(GLOBAL.ADD_ADDRESS_URL, {
			method: 'POST',
			headers: this.state.headers,
			body: json.Stringify(body),
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



	render(){
	
		return (
		
			<View>
				
			</View>
		
		
		);
	
	
	}


}