'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableOpacity,
  ListView,
  Image,
	AsyncStorage,
} from 'react-native';



import Cart from '../cart/index';


export default class ProductPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			product : this.props.product,
			count: 0,
		
		}

	}
	
	
	componentDidMount() {
		this._loadInitialSate().done();
			
	}



	
	
	async _loadInitialSate(){
		var _this = this;
		try {
			await AsyncStorage.getAllKeys(function(err, keys){
			
				var SP_keys = keys.filter(function(key){
					return key.startsWith('SP-');
				});
				
				_this.setState({
					count : SP_keys.length
				});
			});


		} catch(error) {
			console.log(error.message);
		}
	
	}
		
	async _addToCartPress(data) {
	
		
		var t = this.state.count;
		t += 1;

		this.setState({
			count : t
		});
		
		
		try {
			await AsyncStorage.setItem('SP-' + this._genID() + '-SP', JSON.stringify(this.state.product));
		}
		catch (error) {
			//this._appendMessage('AsyncStorage error: ' + error.message);
			console.log(error.message);
		}
		

	}
		


	_goToCartPress(){
		this.props.navigator.push({
		  component: Cart,
		});
	}
	
	_genID() {
		return 'xxxxxxx-xxxx-2xxxx-bxxxxxxxxx'.replace(/[xy]/g,function(c){
			var r = Math.random() * 16|0,
			v = c == 'x'?r:(r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	
	}
	
	
	
	
	render() {
	
	
		return (
		
			<View>
			<View style={styles.container}>
			
			<TouchableOpacity onPress = {() =>this._addToCartPress()}>
				<View style={styles.addToCart}>
					<Text style={styles.addToCartText}>
						加入购物车
					</Text>
				</View>
			</TouchableOpacity>
			
			<TouchableOpacity
				onPress={() =>this._goToCartPress()}
				style={styles.cartContainer}>
				<Image
						source={require('./images/product/cart.png')}
						style={styles.cart}/>
						
		  </TouchableOpacity>
				<Text>
					{this.state.count}
				</Text>

	
			</View>
			
			</View>
		
		);
	
	}


}



var styles = StyleSheet.create({
  container: {
    height: 60,
		backgroundColor: '#365F4E',
		flexDirection: 'row',
		position:'relative',
		bottom:0

  },
	
	cartContainer: {
		position: 'absolute',
		height:70,
		width:70,
		bottom:15,
		right:20,
	},
	cart: {
		height:70,
		width:70,

	},

	addToCart: {
		backgroundColor:'#437661',
		height:60,

		
	},
	addToCartText: {
		fontSize:18,
		color:'#FFF',
		margin:15,
	},
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565',

  }


});
