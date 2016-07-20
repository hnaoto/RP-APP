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




import CartPanel from './CartPanel';



export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			products:	[],
			price: 0,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			subtotal: 0,
		}
		
	}
		
	
	
	componentDidMount() {
		this._loadInitialSate().done()
	}
	

	
		
		
		async _loadInitialSate() {
			var _this = this;
			var subtotal = 0;
			try {
				var keys = await AsyncStorage.getAllKeys();
		
				if (keys != null) {
				var SP_keys = keys.filter(function(key){
						return key.startsWith('BC-P');
						
				});
				
				AsyncStorage.multiGet(SP_keys,function(errs,result){
                var arr = [];
                for(var i in result){
										let value = JSON.parse(result[i][1]);
                    arr.push(value);
										subtotal += (value.price * value.cart_count);
                }
								
                _this.setState({
                    products:arr,
										dataSource: _this.state.dataSource.cloneWithRows(arr),
										subtotal: subtotal,
                });
            });
				
				
					
			}
				
			} catch(error) {
				console.log(error.message);
			}
		
	
	
		}
	
		
	_incrementPress(product) {
	

		this._updateProduct(product);
		
		
		
		
	}
	
	
	async _updateProduct(product){
	
			try{
			var value = await AsyncStorage.getItem('BC-P-ID' + product.id);
			if (value !== null){
				var tp = JSON.parse(value).cart_count;
				let updatedProduct = { cart_count : tp + 1 };
				await AsyncStorage.mergeItem('BC-P-ID' + product.id, JSON.stringify(updatedProduct));
			//this._loadInitialSate();


				var ps = this.state.products;
				var i = ps.indexOf(product);
				//product['cart_count'] +=1;
				//console.log(product);
				
				//this.state.dataSource.find(x=> x.id === product.id)
				//var complement = this.state.products.filter(function(obj){ return obj.id != product.id});
				//complement.push(product);
				
				ps[i].cart_count += 1;;
				
				console.log(ps);
				
				this.setState({
					products: ps,
					dataSource: this.state.dataSource.cloneWithRows(ps),
				});
			
		}
			
		
		} catch(error) {
		
			console.log(error.message);
		}
			
	}
			
			
	_renderProduct(product) {
		
	 return(

	 
			<View style={styles_list.container}>
			
			
			<View style={styles_list.shopContainer}>
			<Text>
			 xxxxx店名
			</Text>
			</View>
			
      <View style={styles_list.mainContainer}>
        <Image
          source={ require('../shop/images/product/none.jpg')}
          style={styles_list.thumbnail}
        />
					<View style={styles_list.rightContainer}>
					<View style={styles_list.titleContainer}>
						<Text style={styles_list.name}>
							{product.basic_info.name}
						</Text>
						<Text style={styles_list.price}>¥{product.price}</Text>
					</View>
					
	
					
					
					<View style={styles_list.verticalContainer}>
					
					
						<Text>
							{product.basic_info.size}
						</Text>
					
					
					
						<Text style={styles_list.rating}>
							{product.cart_count}
						</Text>
					
					<TouchableOpacity
						onPress = {() =>this._incrementPress(product)}>
						<Text>
							+
						</Text>
					</TouchableOpacity>
					
					
					</View>
				
				
				</View>
				
				

				
      </View>
			
			</View>
			
		);
	}





	render() {


		var productList = null;
		var cartPanel = null;
		var price = 0;
		if(this.state.products.length!=0){
		
			productList  = (
					<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderProduct.bind(this)}
					style={styles_list.listView}
       />);
			
			
			cartPanel = (<CartPanel
										subtotal={this.state.subtotal}/>);
	
	

		}
		
		return (
		
		
			<View style={styles.container}>
			<ScrollView>
				{productList}
			</ScrollView>
				{cartPanel}
			</View>
		
		
		
		)
	
	
	
	}

}





var styles_list = StyleSheet.create({
	container: {
		height: 150,
		flex:1,
		backgroundColor:'#FFF',
		borderColor: '#F8F8F8',
		borderWidth: 1,
		
	
	},
  mainContainer: {
    flexDirection: 'row',
		borderBottomColor: '#F8F8F8',
		borderBottomWidth: 1,
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
		height: 90
  },
  rightContainer: {
    flex: 1,
		marginLeft: 5,
	
  },
  name: {
    fontSize: 16,
		paddingTop: 1,
		paddingRight: 3,
		fontWeight: '500',
		color:'#666'
    
  },
  year: {
    textAlign: 'center',
  },
	price: {
    fontSize: 16,
		fontWeight: '600',
		color: '#B23009',
		textAlign: 'right',
	},
  thumbnail: {
    width: 127,
    height: 90,
		
  },

	titleContainer: {
		flexDirection: 'row',
		flex: 1,
	},
	rating: {
		color: '#EA8530',
		fontSize: 12,
	},
	verticalContainer: {
	  marginTop: 15,
		padding: 4,
		flexDirection: 'column',
	},
	statusText: {
		color: '#FFF',
		fontSize: 12,
		fontWeight: '900',
	},
	shopContainer: {
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
		
	
	},
});


var styles = StyleSheet.create({
	container: {
		flex:1,
  },
	

});
