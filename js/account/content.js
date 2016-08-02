

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
import ConfigView from './config';


export default class Account extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			loggedIn: false,
			TOKEN: '',
			username: '登录/注册',
		});
		

		
	}


	componentDidMount(){
	 this._loadInitState().done();
	 
	
	}

	_login(event) {
		this.props.navigator.push({
			component: LoginView,
			title: '用户登录/注册',
		
		});
	}
	
	
	
	_profile(){
		this.props.navigator.push({
			component: ProfileView,
			title: '用户信息',
		
		});
	
	}


	_config(){
		this.props.navigator.push({
			component: ConfigView,
			title: '账户设置',
		
		});
	
	}

	
	
	_orderOnPress() {
		this.props.navigator.push({
			component: Orders,
			title: '全部订单',
		});
	}
	
	

	

	
	
	async _loadInitState(){
		try{
			var value = await AsyncStorage.getItem('AUTH_TOKEN');
			
			if (value != null){
				this.setState({
					TOKEN: value,
					loggedIn: true,
				});
				window.TOKEN = value;
				
				
				
				
			}
			
		} catch(error){
			console.log(error.message);
		}
	
	
	}

	
	_headerView(){
		var header = (<Header
									TOKEN={this.state.TOKEN}
									username={this.state.username}
									_profileOnPress={this._login.bind(this)} />
								);
		
		
		if (this.state.loggedIn){
			header =	(<Header
									TOKEN={this.state.TOKEN}
									username={this.state.username}
									_profileOnPress={this._profile.bind(this)}
									_profile={this._profile.bind(this)}
									_config={this._config.bind(this)}/>);
		
		}
		return header;
	
	}
	
	
	_onMenuClick() {
	
	
	}

	render() {

	
		var header = this.state.loggedIn ?
								(<Header
									TOKEN={this.state.TOKEN}
									username={this.state.username}
									_profileOnPress={this._profile.bind(this)}
									_profile={this._profile.bind(this)}
									_config={this._config.bind(this)}/>)
								:
								(<Header
									TOKEN={this.state.TOKEN}
									username={this.state.username}
									_profileOnPress={this._login.bind(this)} />
								);
		
		return(
		
			
		
		
			<View style={styles.container}>
				{this._headerView()}
					
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