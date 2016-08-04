
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


export default class AddAddress extends Component {

	constructor(props){
		super(props);
		this.state = ({
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},

		
		});
		

	}
	
	
	componentDidMount() {
		this._loadInit();
	}
	

	
	

	
	



	
	_addAddress(){
		
	
	}



	render(){

		var loginButton = (this.state.username && this.state.password) ?
				(<TouchableOpacity
					style={styles.button}
					onPress={() => this._loginOnPress() }>
          <Text style={styles.buttonText}>登录</Text>
				</TouchableOpacity>):
				(<View style={styles.grayButton}>
					<Text style={styles.buttonText}>登录</Text>
				</View>);
		
    return (
      <View style={styles.container}>


			<View style={styles.inputContainer}>
				<Text style={styles.surText}>
					账号
				</Text>
				<TextInput
				  style={styles.input}
					placeholder='用户名'
					onChangeText={ (username)=> {
					  username = username.replace(/ /g, '_');
						this.setState({username})} }
				  value={this.state.username}
				/>
			</View>
				
				
			<View style={styles.inputContainer}>
				<Text style={styles.surText}>
					密码
				</Text>
			  <TextInput
				  style={styles.input}
					placeholder='请输入密码'
					secureTextEntry={true}
					onChangeText={ (password)=> {
					password = password.replace(/ /g, '_');
					this.setState({password})} }
					value={this.state.password}
				/>
			</View>
				
				
				{loginButton}

		
      </View>
	
	
	}


}