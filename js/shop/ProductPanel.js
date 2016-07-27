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
	TouchableHighlight,
} from 'react-native';



import Cart from '../cart/index';





export default class ProductPanel extends React.Component {

	constructor(props) {
		super(props);
		
	
	
		this.props.product['cart_count'] = 1;
		
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
		var sum = 0;
		let a = {};
		
		try {
		//	var value = await AsyncStorage.getItem('BC-P-ID' + this.state.product.id);
		//	if (value !== null){
	//			this.setState({product: JSON.parse(value)});
		//	}
		
			
			var keys = await AsyncStorage.getAllKeys();
			var BCP_keys = keys.filter(function(key){
					return key.startsWith('BC-P');
			});
		 console.log(BCP_keys);
		var stores = await AsyncStorage.multiGet(BCP_keys);
		 stores.map((result, i, store) => {
			let value = JSON.parse(store[i][1]);
			sum += value.cart_count;
						
		 });
			

		this.setState({
			count: sum,
		});
				
		


		
		} catch(error) {
			console.log(error.message);
		}
	}
	
	
	
		
	async _addToCartPress(data) {
	
		
		var _this = this;
		var t = this.state.count;
		t += 1;

		this.setState({
			count : t
		});
		
		
		
		//this.state.product.cart_count +=1;
		//let updatedProduct = this.state.product;
		
		
		
		//	var value = await AsyncStorage.getItem('BC-P-ID' + this.state.product.id);
	//		if (value !== null){
			
			
	//			this.setState({product: JSON.parse(value)});
		// 	}
		
		
	//	AsyncStorage.mergeItem('BC-P-ID' + _this.state.product.id, JSON.stringify(updatedProduct), () => {
		//			console.log(this.state.product)
		//});
		
		
		
		
		
		try {
			var value = await AsyncStorage.getItem('BC-P-ID' + this.state.product.id);
			if (value !== null){
			  var tp = JSON.parse(value).cart_count;
				let updatedProduct = { cart_count : tp + 1 };
				await AsyncStorage.mergeItem('BC-P-ID' + _this.state.product.id, JSON.stringify(updatedProduct));
				
				
		
			} else{
				 await AsyncStorage.setItem('BC-P-ID' + this.state.product.id, JSON.stringify(this.state.product));
			
			
			}
			
		 	

		
		
		} catch(error){
		
			console.log(error.message);
		}
		
		
		

	
		

	}
	
	
	
	async _getAllProducts(){
	
	
		try{
			var keys = await AsyncStorage.getAllKeys();
			var BCP_keys = keys.filter(function(key){
					return key.startsWith('BC-P');
			});
		var data =  [];
		var stores = await AsyncStorage.multiGet(BCP_keys);
		 stores.map((result, i, store) => {
			let value = JSON.parse(store[i][1]);
		  data.push(value);
			this.setState({
				data: data,
			});
			
						
		 });
		} catch(error) {
			console.log(error.message);
		}
		
	
	}
		


	_goToCartPress(){
		
		this.props.navigator.push({
		  component: Cart,
			passProps: {products: this.state.data}
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
			
			<TouchableHighlight
				onPress={() =>this._goToCartPress()}
				style={styles.cartContainer}>
				<Image
						source={require('./images/product/cart.png')}
						style={styles.cart}/>
						
						
						
		  </TouchableHighlight>
			
			
			<View style={styles.countContainer}>
				<Text style={styles.countText}>
					{this.state.count}
				</Text>
			</View>
			


	
			</View>
			
			</View>
		
		);
	
	}


}



var styles = StyleSheet.create({
  container: {
    height: 47,
		backgroundColor: '#365F4E',
		flexDirection: 'row',
		position:'relative',
		bottom:0

  },
	
	cartContainer: {
		position: 'absolute',
		height:70,
		width:70,
		bottom:2,
		right:20,
	},
	countContainer: {
		position: 'absolute',
		height:14,
		width:24,
		bottom:55,
		right:68,
		backgroundColor: '#B20000',
		borderRadius: 10,
	},
	countText: {
	 color: '#FFFFFF',
	 fontSize: 12,
	 lineHeight:14,
	 textAlign: 'center',
	 backgroundColor: 'transparent',
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
