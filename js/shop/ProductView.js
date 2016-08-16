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
			
			
				<Text
					style={styles.title}>
					{product.basic_info.name}
				</Text>
				
        <Image
					style={styles.image}
					source={{uri: product.basic_info.picture_backup}} />
						
						
						
						
        <View style={styles.heading}>
				
				
					<View style={styles.first_line}>
							<Text style={styles.size}>规格：{product.basic_info.size}</Text>
							<Text style={styles.price}>¥{product.price}</Text>
					</View>
				</View>
   
				
					
				<View style={styles.infoContainer}>
				
					<Text style={styles.infoTitle}>商品简介</Text>
					<View style={styles.infoContent}>
						<Image
							style={styles.seImg}
							source={require('./images/product/se.png')} />
						<Text style={styles.infoText}> 产品特点：产品外裹一层来自新疆的优质孜然香料，原肉制作，口感爽滑，食后齿颊留香。</Text>
					</View>
				</View>
			
				
				
				
				
				
					
				<View style={styles.infoContainer}>
				
					<Text style={styles.infoTitle}>评价</Text>
					<View style={styles.infoContent}>
						<Image
							style={styles.seImg}
							source={require('./images/product/se.png')} />
						<Text style={styles.infoText}> 产品特点：产品外裹一层来自新疆的优质孜然香料，原肉制作，口感爽滑，食后齿颊留香。</Text>
					</View>
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
		flex:1,
		flexDirection: 'column',
	},
  heading: {
    backgroundColor: '#F8F8F8',
		padding: 15,
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
		fontWeight: '600',
    fontSize: 25,
    color: '#365F4E',
		flex: 1,
		textAlign: 'right',
		
	
  },
  title: {
    fontSize: 22,
    margin: 5,
    color: '#666666',
		padding: 15,
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
	first_line: {
		flexDirection: 'row',

	},
	size: {
		fontSize: 17,
		color: '#000000',
		flex: 1,
	
	
	},
	infoContainer: {
		padding: 15,
	
	
	},
	infoTitle: {
		fontSize: 20,
		color: '#666',
		marginBottom: 10,
		fontWeight: '500',
		
		
	
	},
	infoContent: {
		flexDirection: 'row',
	},
	infoText: {
		width: 340,
		fontSize: 15,
		lineHeight: 20,
	
	},
	seImg: {
		width: 3,
		height: 24,
	
	}
							 
});