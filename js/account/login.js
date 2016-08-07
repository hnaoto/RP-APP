

// import Swiper from 'react-native-swiper'
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  TextInput,
  Platform,
	TouchableOpacity,
	AsyncStorage,
	Alert,
	
} from 'react-native';


import * as GLOBAL from '../config/Global';



export default class LoginView extends Component {

	constructor(props){
		super(props);
		
		this.state = ({
			username: '',
			password: '',
			message: '',
		
		});
	
	}


	_loginOnPress(){
		this._post(GLOBAL.LOGIN_URL);
	
	}


	_post(url){
		var body= {
			username: this.state.username,
			password: this.state.password,
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
		.then(response => response.json())
		.then((responseData) => {
			console.log(responseData);
			if (typeof responseData.token == 'undefined'){
				Alert.alert('用户名或者密码错误');
			}else{
				window.TOKEN = responseData.token;
			  this._setToken(responseData.token);
				this.props.navigator.pop();
			}

		})
		.catch(error =>
			this.setState({
				message: '系统故障，请稍后重试' + error
		}));
	
	}

	async _setToken(token) {
		try{
			await AsyncStorage.setItem('AUTH_TOKEN', token);
		} catch(error){
			console.log(error.message);
		}
	}
	
	
  render() {

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
    );
  }
}

var styles = StyleSheet.create({
  container: {
		flex:1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
		flexDirection: 'column',
  },
	inputContainer: {
		borderBottomColor: '#666',
		borderBottomWidth: 1,
		marginBottom: 50,
		flexDirection: 'row',
	},
	input: {
		color: '#999',
		height: 40,
		flex: 1,
		alignSelf: 'flex-start',
	},
	surText: {
		flex:1,
		height: 20,
		width: 40,
		fontSize: 18,
		
	},
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
	button: {
    height: 36,
    backgroundColor: '#69A44A',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
	},
  grayButton: {
    height: 36,
    backgroundColor: '#DDD',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
	
	
	
	
});



