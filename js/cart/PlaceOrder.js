
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
	ScrollView,
	Alert,
} from 'react-native';


import * as GLOBAL from '../config/Global';
import SetDefaultAddress from './SetDefaultAddress';
import AddressList from './AddressList';
import OrderPanel from './OrderPanel';
import PayOrder from '../order/payOrder';

export default class PlaceOrder extends Component {

	constructor(props){
		super(props);
		
		
		this.state = ({
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},
			products: [],
			customerDetail: {},
			selectedAddress: {},
			shippingInfo: '',
			receiverInfo: '',
			count: 0,
			subtotal: 0,
			message:'订单创建成功',
		});
		

	}

	componentDidMount() {
		this._initLoad();
		
		this.setState({
			products:this.props.products,
			subtotal: this.props.subtotal,
			count: this.props.count,
		
		
		});

	
	}


	componentWillReceiveProps() {
		this._loadSelectedAddress();
	}




	async _loadSelectedAddress() {
		try{
			var selectedAddress = await AsyncStorage.getItem(GLOBAL.STORE_KEY.SELECTED_ADDRESS);
		
			if (selectedAddress) {
			
				var value = JSON.parse(selectedAddress);
	
				this.setState({
					receiverInfo: (value.receiver + ' ' + value.cellphone_number),
					shippingInfo: value.shipping_address,
					selectedAddress: JSON.parse(selectedAddress),
				});
				
			}
		}catch (error){
			console.log(error.message);
		}
	}
	
	

	async _initLoad(){
		try{
			var customerDetail = await AsyncStorage.getItem(GLOBAL.STORE_KEY.CUSTOMER_DETAIL);
			var selectedAddress = await AsyncStorage.getItem(GLOBAL.STORE_KEY.SELECTED_ADDRESS);
			
			
			if (customerDetail &&  selectedAddress ) {
				this.setState({
					customerDetail: JSON.parse(customerDetail),
					selectedAddress: JSON.parse(selectedAddress),
				});
				
				this._initShippingInfo();
				
				
				
	
			}
		}catch (error){
			console.log(error.message);
		}
	
	}


	_initShippingInfo(){
		var customerDetail = this.state.customerDetail;
		var selectedAddress = this.state.selectedAddress;
		var shippingInfo = '';
		var receiverInfo = '';
		
		
		
		
		if (!customerDetail.default_address && !selectedAddress)	{
				shippingInfo = '暂无默认地址，点击添加';
		}else {
			receiverInfo = customerDetail.default_address ?
											(customerDetail.default_address.receiver +  ' ' + customerDetail.default_address.cellphone_number)  :
											(selectedAddress.receiver + ' ' + selectedAddress.cellphone_number);
			shippingInfo = customerDetail.default_address ?
											(customerDetail.default_address.receiver +  ' ' + customerDetail.default_address.shipping_address)  :
											(selectedAddress.shipping_address);
		
		}
		
		
		this.setState({
			receiverInfo: receiverInfo,
			shippingInfo: shippingInfo,
		
		});
		
	}



	
	_createOrder(){
	
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

		var plist = [];
		var products = this.state.products;
		for (var i = 0; i < products.length; i++) {
			plist.push ({
				product: products[i].id,
				number: products[i].cart_count,
			
			});
		
		}
		
		
		var body = {
			order : {
				address: this.state.selectedAddress.id,
			},
			products: plist
			
		};
		

		
		
		fetch(GLOBAL.URL.PLACE_ORDER, {
			method: 'POST',
			headers: this.state.headers,
			body: JSON.stringify(body),
		})
		.then(response =>
			{
				response.json()
				if (response.status == 201) {
					this.props._clearCart();
					this.props.navigator.pop();

					console.log('ok');
				}
			}
		
		)
		.catch(error => {
			this.setState({
				message: '系统故障，请稍后重试' + error.message
		})});
		
		
		Alert.alert(
			null,
			this.state.message,
		[
		 {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
		]
		);
	
	
	
	}
	
	
	
	_orderCreated(){
		//clear cart
		
		
		//
		this.props.navigator.push({
			component: payOrder,
			title: '支付订单',
			
			
		
		});
	
	}
	
	
	
	_renderProducts(){
			var list = [];
		
			var products = this.state.products;
			products.map(function(pt, key){
				if (key <= 2) {
					list.push(
						(<View
							key={key}
							style={styles_list.container}>
							<Image
							source={{uri: pt.basic_info.picture_backup}}
							style={styles_list.thumbnail}/>
						</View>)
					 );
				}
		
			});
		
		
		
		
		
		
		
			return list;
		
	}

	
	_SetDefaultAddress() {
		this.props.navigator.push({
			component: SetDefaultAddress,
			title: '收货地址',
			
		
		});
	
	}
	
	
	_addressList(){
		this.props.navigator.push({
			component: AddressList,
			passProps: {
				address: this.props.address,
			},
			title: '收货地址',
			
		
		});
	
	}


	_productsOnPress(){
	
	}

	render(){
	

	
		
	
		return (
		
			<View style={styles.container}>
				
				
				
				
				<ScrollView>
			 
					<View style={styles.cell}>
						<TouchableOpacity
							onPress={()=>this._addressList()}>
							<Text style={styles.receiverInfoText}>
								{this.state.receiverInfo}
							</Text>
							<Text style={styles.shippingInfoText}>
								{this.state.shippingInfo}
							</Text>
						</TouchableOpacity>
					</View>


			<TouchableOpacity onPress={() =>  this._productsOnPress()}>

					<View style={styles.listView}>
						{this._renderProducts()}
						
						
					  <View style={styles.countContainer}>
							<Text style={styles.orderText}> 共{this.state.count}件</Text>
							<Text style={styles.orderText}>  >   </Text>
						</View>
					
						
					</View>
		</TouchableOpacity>
					
	
					
					
					
				
				<View style={styles.cell}>
					<Text style={styles.orderText}>商品总价  ¥ {this.state.subtotal} </Text>
					<Text style={styles.orderText}>运费  ¥ 0 </Text>
				</View>
						
						
					
				</ScrollView>
					
				
				
				<OrderPanel
					_createOrder={this._createOrder.bind(this)}
					subtotal = { this.state.subtotal }/>
				
				
	
				
				
			</View>
		
		
		
		);
	}


}






var styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#F8F8F8',
		flexDirection: 'column',
		
  },
	cell: {
		backgroundColor: '#FFF',
		flex: 1,
		marginBottom: 20,
		flexDirection: 'column',
		padding: 10,
	},
	
	
	listView: {
		flexDirection: 'row',
		backgroundColor:'#FFF',
		marginBottom: 20,

	},
	
	countContainer:{
		alignItems: 'center',
		flexDirection: 'row',
		
	},
	
	orderText: {
		color: '#555',
		fontSize: 15,
		fontWeight: '600',
	
	},
	
	receiverInfoText: {
		color: '#222',
		fontSize: 15,
		fontWeight: '700',
		marginBottom: 10,
	},
	

	
	


});



var styles_list = StyleSheet.create({
	container: {

		alignSelf: 'flex-start',
	
	},
  thumbnail: {
    width: 100,
    height: 75,
		
  },

});
