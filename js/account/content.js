

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
} from 'react-native';


import MenuButton from './MenuButton';
import Header from './Header';
import LoginView from './login';


export default class Content extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			loggedIn: false,
		});
		
	}


	_login(event) {
		this.props.navigator.push({
			component: LoginView,
		
		});
	}
	



	render() {

		
		return(
		
		
		
		
			<View style={styles.container}>
				<Header  _login={this._login.bind(this)} />
		
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
	menuView: {
		marginTop: 95,
		backgroundColor: '#FFFFFF',
    flexDirection: 'row',
	}





});