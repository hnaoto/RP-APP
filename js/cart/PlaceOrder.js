
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
} from 'react-native';


import * as GLOBAL from '../config/Global';
import SetDefaultAddress from './SetDefaultAddress';
import AddressList from './AddressList';
import OrderPanel from './OrderPanel';

export default class PlaceOrder extends Component {

	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = ({
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},
      dataSource: ds.cloneWithRows(this.props.products),
			products: this.props.products,
			customerDetail: {},
			selectedAddress: {},
			shippingInfo: '',
			count: 0,
		});
		

	}

	componentDidMount() {
		this._initLoad();

	
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
		var shippingInfo = null;
		
		
		
		
		if (!customerDetail.default_address && !selectedAddress)	{
				shippingInfo = '暂无默认地址，点击添加';
		}else {
			shippingInfo = customerDetail.default_address ?
											(customerDetail.default_address.receiver +  ' ' + customerDetail.default_address.shipping_address)  :
											(selectedAddress.receiver + ' ' + selectedAddress.shipping_address);
		
		}
		
		
		this.setState({
			shippingInfo: shippingInfo,
		
		});
		
	}



	
	_placeOrder(){
	
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
		
		
		
		fetch(GLOBAL.PLACE_ORDER_URL, {
			method: 'POST',
			headers: this.state.headers,
			body: json.Stringify(body),
		})
		.then(response => response.json())
		.then(
			(responseData) => {
				console.log(responseData);
			}
		)
		.catch(error =>
			this.setState({
				message: '系统故障，请稍后重试' + error
		}));
	
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
							<Text style={styles.orderText}>
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
					<Text style={styles.orderText}>商品总价 </Text>
					<Text style={styles.orderText}>运费  </Text>
				</View>
						
						
					
				</ScrollView>
					
				
				
				<OrderPanel/>
				
				
	
				
				
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
		paddingLeft: 15,
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
	
	},
	shippingInfoText: {
		color: '#000',
		fontSize: 13,
		fontWeight: 400,
	
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
