
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
	TextInput,
} from 'react-native';


import * as GLOBAL from '../config/Global';
import * as Ultility from '../lib/Ultility';


export default class AddAddress extends Component {

	constructor(props){
		super(props);
		this.state = ({
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},
			receiver: '',
			cellphone: '',
			shippingAddress: '',

		
		});
		

	}
	
	
	componentDidMount() {
	
	
	
		//this._loadInit();
	}
	

	
	

	_errorAlert(message){
		Alert.alert(
			 message,
			 null,
		  [
			 {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
			]
);
	
	}
	
	_saveOnPress() {
		fetch(GLOBAL.URL.ADD_ADDRESS, {
			method: 'POST',
			headers: this.state.headers,
			body: JSON.stringify({
				'receiver': this.state.receiver,
				'shipping_address': this.state.shippingAddress,
				'cellphone_number': this.state.cellphone,
				
			})
		})
		.then(response =>
			{
				response.json()
				if (response.status == 200){
						this.props.navigator.pop();
					
				}
			}
		)
		.then(
			(responseData) => {
				
				console.log(responseData);
				
				
			}
		)
		.catch(error =>
				{//Ultility.errorAlert('保存失败，请重试');
					console.log(error.message);
				}
			
			);
	
	}


	
	_addAddress() {
		
	
	}
	
	
	
  render() {

		var saveButton = (this.state.receiver && this.state.cellphone && this.state.shippingAddress) ?
				(<TouchableOpacity
					style={styles.button}
					onPress={() => this._saveOnPress() }>
          <Text style={styles.buttonText}>保存</Text>
				</TouchableOpacity>):
				(<View style={styles.grayButton}>
					<Text style={styles.buttonText}>保存</Text>
				</View>);
		
    return (
      <View style={styles.container}>


			<View style={styles.inputContainer}>
				<Text style={styles.surText}>
					收货人:
				</Text>
				<TextInput
				  style={styles.input}
					onChangeText={ (receiver)=> {
					  receiver = receiver.replace(/ /g, '_');
						this.setState({receiver})} }
				  value={this.state.receiver}
				/>
			</View>
			
			
			<View style={styles.inputContainer}>
				<Text style={styles.surText}>
					联系方式:
				</Text>
				<TextInput
				  style={styles.input}
					keyboardType="numeric"
					onChangeText={ (cellphone)=> {
					  cellphone = cellphone.replace(/ /g, '_');
						this.setState({cellphone})} }
				  value={this.state.cellphone}
				/>
			</View>
			


			<View style={styles.inputContainer}>
				<Text style={styles.surText}>
					详细地址:
				</Text>
				
				<TextInput
				  style={styles.input}
					onChangeText={ (shippingAddress)=> {
					  shippingAddress = shippingAddress.replace(/ /g, '_');
						this.setState({shippingAddress})} }
				  value={this.state.shippingAddress}
				/>
			</View>
			
			
			
				
				{saveButton}

		
      </View>
    );
  }

	
	
	
}




var styles = StyleSheet.create({
  container: {
		flex:1,
		marginTop: 80,
    backgroundColor: '#ffffff',
		flexDirection: 'column',
  },
	inputContainer: {
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		flexDirection: 'row',
		padding:10,
		alignItems: 'center',
		marginBottom:15,
	
	
	},
	input: {
		color: '#333',

		fontSize: 15,
		width: 250,
 
	},
	surText: {
		
		fontSize: 15,
		color: '#333',
		paddingRight: 10,

		
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
		position: 'absolute',
		bottom: 25,
		left: 90,
		width: 200,
    height: 36,
    backgroundColor: '#69A44A',
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
	},
  grayButton: {
		position: 'absolute',
		bottom: 25,
		left: 90,
		width: 200,
    height: 36,
    backgroundColor: '#DDD',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
	
	
	
	
});




