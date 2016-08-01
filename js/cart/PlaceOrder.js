
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
} from 'react-native';


import * as GLOBAL from '../config/Global';

export default class PlaceOrder extends Component {

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



	
	_placeOrder(){
	
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
		
		
		
		fetch(GLOBAL.PLACE_ORDER_URL, {
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
		
			
		
		
		
		);
	
	
	}


}