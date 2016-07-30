
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
	ListView,
} from 'react-native';



var http = require('../lib/Http');
import * as GLOBAL from '../config/Global';
import OrderView from './OrderView';



export default class Orders extends Component {

	constructor(props){
		super(props);
		this.state = ({
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},
			dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		
		});
		
		this._getOrders = this._getOrders.bind(this);
	}


	componentDidMount() {
		this._getOrders();
	
	}

	_getOrders(){
	
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
		
		
		
		fetch(GLOBAL.ALL_ORDER_URL, {
			method: 'GET',
			headers: this.state.headers
		})
		.then(response => response.json())
		.then(
			(responseData) => {
				console.log(responseData);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData),
				});
			}
		)
		.catch(error =>
			this.setState({
				message: '系统故障，请稍后重试' + error
		}));
		
		
		
		
		
	
	}




	_orderRowPressed(product){
		
		this.props.navigator.push({
			component: OrderView,
			passProps: {
				order: order,
			},
		});
	}



	_renderProducts(products) {
		
		
		
		var p = [];;
		
		
		products.map(function(pt, key){
		  
			var product = pt.product;



			p.push(
			
			<View
				key={key}
				style={styles_list.infoContainer}>
				
				
					<Image
						source={require('../shop/images/product/none.jpg')}
						style={styles_list.thumbnail}/>
		
						 
		
		
			
			
					
					
					<View style={styles_list.verticalContainer}>
						<Text style={styles_list.name}>
							{product.basic_info.name} {product.basic_info.size}
						</Text>
						
						
						<Text style={styles_list.price}>¥{product.price}</Text>
						
					
						
					</View>
					
					
				
				
				

		  </View>
				
				);
		
			
		});
		
		
		
		
		return p;
	
	
	}

	
	_renderOrder(order) {
	
		
		var status = '待付款';
		var products = this._renderProducts(order.products);
		
		
		
		
		
		return (
		
		
		
			<TouchableOpacity
				onPress={() => this._orderRowPressed(order)}>
				
				
		
      <View style={styles_list.container}>
				
			
	
				<View style={styles_list.statusContainer}>
					<Text style={styles_list.statusText}>
						{status}
					</Text>
					
					<Text style={styles_list.orderNumberText}>
						{order.order_number}
					</Text>
						
					
				</View>
				
				
				
				<View style={styles_list.productsContainer}>
				 { products }
				</View>
					
				
				
	
				<View style={styles_list.subContainer}>
					<Text style={styles_list.subText}>
						合计：
					</Text>
					
					<TouchableOpacity
						style={styles_list.payButton}>
						<Text style={styles_list.payText}>去支付</Text>
					</TouchableOpacity>
				</View>
				

						
      </View>
		
		
		
			</TouchableOpacity>
		
		);
		
	
	}
	
	





	render(){
		return(
			<View style={styles.container}>
			
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderOrder.bind(this)}
					style={styles_list.listView}
       />
				
			</View>
		
		);
	}
	


}





var styles = StyleSheet.create({
	container: {
		flex : 1,
		backgroundColor: '#F8F8F8',
	},


});



var styles_list = StyleSheet.create({
	listView: {
		
	
	},
  container: {
    flexDirection: 'column',
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: '#FFF',
		marginTop: 15,
  },
	
	infoContainer:{
		flexDirection: 'row',
		paddingBottom: 30,
		
	
	},
	
	
	
	productsContainer: {
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',
	},
	statusContainer: {
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',
		flexDirection: 'row',

	},
	statusText:{
		color: '#DF434D',
		fontSize: 20,
		fontWeight: '500',
		padding: 10,
		flex: 1,
	},
	
	orderNumberText: {
		textAlign: 'right',
		color: '#AEAEAE',
		fontSize: 15,
		padding: 10,
		flex: 1,
		

	},
  rightContainer: {
    flex: 1,
		marginLeft: 5,
	
  },
  name: {
    fontSize: 20,
		paddingTop: 1,
		paddingRight: 3,
		color:'#666',
		width: 250,
  },
  year: {
    textAlign: 'center',
  },
	price: {
    fontSize: 16,
		fontWeight: '600',
		color: '#B23009',
		textAlign:'left',
	},
  thumbnail: {
    width: 127,
    height: 90,
		
  },

	titleContainer: {
		flexDirection: 'row',
		flex: 1,
	},

	verticalContainer: {
		padding: 4,
		flexDirection: 'column',
	},
	payButton: {
		borderWidth: 1,
		borderColor: '#DF434D',
		borderRadius: 5,
		padding: 10,
		position: 'absolute',
		right: 20,
		top: 15,
	},
	payText: {
		fontSize: 18,
		color: '#DF434D',
		paddingLeft: 10,
		paddingRight:10,
	},
	subContainer: {
		paddingBottom: 25,
		paddingTop: 25,
		paddingRight: 15,
		paddingLeft: 10,
	},
	subText:{
		color: '#666',
		fontSize: 20,
	 
	 
	
	},

});



