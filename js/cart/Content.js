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
	ScrollView,
	Alert,
} from 'react-native';


import Header from './Header';
import CartPanel from './CartPanel';
import SetAddress from './SetAddress';
import PlaceOrder from './PlaceOrder';
import * as GLOBAL from '../config/Global';
import LoginView from '../account/login';



export default class Cart extends React.Component {
	constructor(props){
		super(props);
		

		this.state = {
			products:	[],
			price: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
					return true;
				},
      }),
			subtotal: 0,
			productKeys: [],
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},
			address: [],
			customerDetail: {},
			count: 0,
		}
		
	}
		
	
	
	componentDidMount() {
		this._loadAddress();
		this._loadInitialSate().done()
	
	}
	

	
	
	
		
		
		async _loadInitialSate() {
			var _this = this;
			var subtotal = 0;
			var count = 0;
			try {
			
				//get customer detail
				
				var detail = await AsyncStorage.getItem(GLOBAL.STORE_KEY.CUSTOMER_DETAIL);
				
				if (detail) {
					this.setState ({
						customerDetail: detail,
 					
					});
				
				}
				
				
				
				
				//get products
			
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
										count += value.cart_count;
										
                }
								console.log(arr);
								
                _this.setState({
                    products:arr,
										dataSource: _this.state.dataSource.cloneWithRows(arr),
										subtotal: subtotal,
										productKeys: SP_keys,
										count: count,
                });
            });
				
				
					
			}
				
			} catch(error) {
				console.log(error.message);
			}
		
	
	
		}
	

	

	
	
	
	_loadAddress(){
/**
		http.get(GLOBAL.ALL_ORDER_URL, this.state.headers, function(data){
			console.log(data);
			if (data !=null){
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(data),
				});
			}
			
		});
**/

		fetch(GLOBAL.ALL_ADDRESS_URL, {
			method: 'GET',
			headers: this.state.headers,
		})
		.then(response => response.json())
		.then(
			(responseData) => {
				this.setState({
					address: responseData,
				});
			}
		)
		.catch(error =>
			this.setState({
				message: '系统故障，请稍后重试' + error
		}));
	
	}


	
		
	_incrementPress(product, rowID) {
	
		
		this._updateProduct(product, rowID, true);
		
	}
	
	_decrementPress(product, rowID) {
		this._updateProduct(product, rowID, false);
		
	}
	
	
	_toFixed( number, precision ) {
    var multiplier = Math.pow( 10, precision );
    return Math.round( number * multiplier ) / multiplier;
	}
	
	async _updateProduct(product, rowID, increment){
		var diff = increment ? 1 : (-1);
		
			try{
			
			var value = await AsyncStorage.getItem('BC-P-ID' + product.id);
			if (value !== null){
			
				var tp = JSON.parse(value).cart_count;
				
				if ( tp + diff >= 0 && tp + diff  <= product.number_in_stock){
				
				
				let updatedProduct = { cart_count : tp + diff};
				
				
			  if (tp + diff  == 0 ){
					await AsyncStorage.removeItem('BC-P-ID' + product.id);
				} else {
					await AsyncStorage.mergeItem('BC-P-ID' + product.id, JSON.stringify(updatedProduct));
				}

				
				
				
				var _products = this.state.products.slice();
			
				_products[rowID].cart_count = product.cart_count + diff;
				
				
				var _ds = (tp + diff  == 0 ) ?   _products.splice(rowID, 1) : _products;
				
				
				var _ds = _products;

				var _subtotal = this._toFixed(this.state.subtotal + diff * product.price , 2);
				
			
				
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(_ds),
						products: _products,
						subtotal: _subtotal,
					});
				}
				
				
				

				
			
			}
			
		
		} catch(error) {
			console.log(error.message);
		}
			
	}
	
	
	
	
	
	
	
	
	async _clearCart() {
		try{
			await AsyncStorage.multiRemove(this.state.productKeys);
			
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows([]),
				products: [],
				subtotal: 0,
			});
		}catch(error){
			console.log(error.message);
		}
	
	
		
	}
	
	

	
	_placeOrder()	{
	
		if (!window.TOKEN) {
			this.props.navigator.push({
				component: LoginView,
				title: '用户登录/注册',
				passProps: {
					_clearCart: this._clearCart.bind(this),
				
				}
			});
		
		} else{
			
		if (this.state.address){
	
			this.props.navigator.push({
				component: PlaceOrder,
				title: '填写订单',
				passProps: {
					address: this.state.address,
					products: this.state.products,
					customerDetail: this.state.customerDetail,
					subtotal: this.state.subtotal,
					count: this.state.count,
					_clearCart: this._clearCart.bind(this),
					
				}
			})
		
		} else{

			this.props.navigator.push({
				component: SetAddress,
				title: '添加地址',
				customerDetail: this.state.customerDetail,
		
			});
			
			}
			
		}
	
	
	}
	
	


			
	_renderProduct(product, sectionID, rowID) {
	
		
	 return(

	 
			<View style={styles_list.container}>
			
			
			<View style={styles_list.shopContainer}>
				<Text style={styles_list.shopText}>
				
				</Text>
			</View>
			
      <View style={styles_list.mainContainer}>
        <Image
          source={{uri: product.basic_info.picture_backup}}
          style={styles_list.thumbnail}
        />
					<View style={styles_list.rightContainer}>
					<View style={styles_list.titleContainer}>
					
						<Text style={styles_list.name}>
							{product.basic_info.name} {product.basic_info.size}
						</Text>
						<Text style={styles_list.price}>¥{product.price}</Text>
					</View>
					
	
					
					<View style={styles_list.buttonContainer}>
					
						<TouchableOpacity
							onPress = {() =>this._incrementPress(product, rowID)}>
							<Text style={styles_list.symbolText}> ＋ </Text>
						</TouchableOpacity>
	
	
						<View style={styles_list.countContainer}>
							<Text style={styles_list.countText}> {product.cart_count} </Text>
						</View>
					
					 <TouchableOpacity
							onPress = {() =>this._decrementPress(product, rowID)}>
							<Text style={styles_list.symbolText}> － </Text>
						</TouchableOpacity>

					</View>
					
					
					
					<View style={styles_list.verticalContainer}>
					
					
	
					


	
					
		
					
					
					</View>
				
				
				</View>
				
				

				
      </View>
			
			</View>
			
		);
	}





	render() {


		var productList = null;
		var cartPanel = null;
		if(this.state.products.length != 0){
			productList  = (
					<ListView
						dataSource={this.state.dataSource}
						renderRow={this._renderProduct.bind(this)}
						style={styles_list.listView}/>);
			
			cartPanel = (<CartPanel
										subtotal={this.state.subtotal}
										_placeOrder={this._placeOrder.bind(this)}/>);
	
	

		}
		
		return (
		
		
			<View style={styles.container}>
				<Header/>
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
		flex:1,
		backgroundColor:'#FFF',
		borderColor: '#F8F8F8',
		borderWidth: 1,
		flexDirection: 'column',
		
	
	},
  mainContainer: {
    flexDirection: 'row',
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
		height: 120,
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
		textAlign: 'left',
	},
  thumbnail: {
    width: 127,
    height: 90,
		
  },

	titleContainer: {
		flexDirection: 'column',
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
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: '#FEFEFE',
		height: 20,
	},
	shopText: {
		fontSize: 16,
		fontWeight: '500',
		marginLeft: 10,
		color: '#777777',
	},
	buttonContainer: {
		flexDirection:'row',
		backgroundColor: '#FFFFFF',
		borderColor: '#A34021',
		borderWidth: 1,
		height: 25,
		borderRadius: 5,
		width: 83,

	},
	countContainer:{
		borderLeftColor: '#A34021',
		borderRightColor: '#A34021',
		borderLeftWidth: 1,
		borderRightWidth: 1,
	},
	countText: {
		color: '#A34021',
		fontSize: 16,
		paddingLeft: 5,
		paddingRight: 5,
	},
	symbolText: {
		color: '#A34021',
		fontSize: 16,
	}
});


var styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#F8F8F8',
		
  },
	

});
