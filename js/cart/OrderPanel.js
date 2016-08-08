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
	ScrollView
} from 'react-native';




export default class OrderPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			subtotal: 0,
		
		
		
		}
		
	
	
	}
	

	
	
	
	render() {
		return (
		
		
			<View>
			  <View style={styles.container}>
				
						
					<Text style={styles.payText}>
						实付款: ¥ {this.props.subtotal}
					</Text>
					

				
				
					<TouchableOpacity
						onPress = {() =>this.props._clearCart()}>
					<Text style={styles.payText}>
						清空购物车
					</Text>
				  </TouchableOpacity>
				
				
				
				
					<TouchableOpacity
						onPress = {() =>this.props._placeOrder()}>
						<View style={styles.payContainer}>
							<Text style={styles.payText}>
								提交订单
							</Text>
						</View>
				  </TouchableOpacity>
					
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

	payContainer: {
		backgroundColor:'#437661',
		height:60,
		
	},
	payText: {
		fontSize:18,
		color:'#FFF',
		margin:14,
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
