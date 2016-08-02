'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  AlertIOS,
  ScrollView,
  NavigatorIOS,
  TextInput,
  Platform,
	ListView,
	TouchableOpacity
} from 'react-native';



import Cart from '../cart/Content';
import ProductPanel from './ProductPanel';

export default class ProductView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product : this.props.product,
		
		}
	
	}
	

	_goToCartPress(){
		
		this.props.navigator.push({
		  component: Cart,
			passProps: {
					products: this.state.data,
					navigator: this.props.navigator,
				}
		});
	}
	



	
	render() {
		var product = this.props.product;
		return (	
      <View style={styles.container}>
			<ScrollView>
				<Text style={styles.title}>{product.basic_info.name}</Text>
        <Image style={styles.image}
            source={{uri: product.basic_info.picture}} />
        <View style={styles.heading}>
					<View style={styles.first_line}>
							<Text style={styles.size}>{product.basic_info.size}</Text>
							<Text style={styles.price}>{product.price}</Text>
						
					</View>
					
 
          <Text style={styles.title}>{product.basic_info.name}</Text>
          <View style={styles.separator}/>
        </View>
			</ScrollView>
				
				<ProductPanel
					product={product}
					_goToCartPress={this._goToCartPress.bind(this)}/>
      </View>
			
		);
	
	}


}
							 
							
var styles = StyleSheet.create({
  container: {
    marginTop: 65,
		flex:1,
		flexDirection: 'column',
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
    margin: 5,
    color: '#365F4E',
		justifyContent: 'flex-end'
	
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#666666'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
	first_line: {
		flexDirection: 'row',
		height: 80,

	},
	size: {
		fontSize: 13,
		color: '#000000',
		
	
	
	}
							 
});