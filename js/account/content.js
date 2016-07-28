

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


import MenuButton from './MenuButton';
import Header from './Header';
import LoginView from './login';
import ProfileView from './profile';
import Orders from './orders';



export default class Content extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			loggedIn: false,
			TOKEN: '',
		});
		
		this._loadInitState();
		
	}


	_login(event) {
		this.props.navigator.push({
			component: LoginView,
		
		});
	}
	
	
	
	_profile(){
		this.props.navigator.push({
			component: ProfileView,
		
		});
	
	}
	
	
	_orderOnPress() {
		this.props.navigator.push({
			component: Orders,
		});
	}
	
	async _loadInitState(){
		try{
			var value = await AsyncStorage.getItem('AUTH_TOKEN');
			
			if (value != null){
				this.setState({
					TOKEN: value
				});
				window.TOKEN = value;
			}
			
		} catch(error){
			console.log(error.message);
		}
	
	
	}

	



	render() {

		
		return(
		
		
		
		
			<View style={styles.container}>
				<Header
					TOKEN={this.state.TOKEN}
					_login={this._login.bind(this)}
					_profile={this._profile.bind(this)}/>
					
				<TouchableOpacity
					style={styles.ordersButton}
					onPress={ () => this._orderOnPress()} >
					<Text style={styles.ordersText}>查看所有订单</Text>
				</TouchableOpacity>
				
				
				<View style={styles.menuView}>
        <MenuButton renderIcon={require('./images/icon/payment.png')}
                    showText={'待付款'} tag={'unpaid'}
                    onClick={this._onMenuClick}/>
					 
        <MenuButton renderIcon={require('./images/icon/shipment.png')}
                    showText={'待发货'} tag={'unshipped'}
                    onClick={this._onMenuClick}/>
					 
						
        <MenuButton renderIcon={require('./images/icon/comment.png')}
                    showText={'待评价'} tag={'un'}
                    onClick={this._onMenuClick}/>
	
						
        <MenuButton renderIcon={require('./images/icon/refund.png')}
                    showText={'退款/售后'} tag={'unpaid'}
                    onClick={this._onMenuClick}/>
					 
					 
				</View>
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
	menuView: {
		paddingTop: 5,
		backgroundColor: '#FFFFFF',
    flexDirection: 'row',
	},
	ordersButton: {
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE',
	},
	ordersText: {
		padding: 15,
		fontSize: 14,
		color: '#777',
		textAlign: 'right',
	
	},





});