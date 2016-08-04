
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
			customerDetail: {},
		
		});
		

	}

	componentDidMount() {
		this._loadCustomerDetail();
	
	}


	async _loadCustomerDetail(){
		try{
			var value = await AsyncStorage.getItem(GLOBAL.STORE_KEY.CUSTOMER_DETAIL);
			if (value !== null) {
				this.setState({
					customerDetail: value,
				});
	
			}
		}catch (error){
			console.log(error.message);
		}
	
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
	
	
	
	
	_renderProduct(product) {
	  return (
		<View style={styles_list.container}>
			<Text>
				{product.basic_info.name}
			</Text>
		
		</View>
		);
	
	}

	
	_SetDefaultAddress() {
		this.props.navigator.push({
			component: SetDefaultAddress,
			title: '收获地址',
			
		
		});
	
	}


	render(){
	
		var customerDetail = this.state.customerDetail;
		var shippingInfo = null;
		if (!customerDetail.default_address)	{
				shippingInfo = '暂无默认地址，点击添加';
		}else {
			shippingInfo = customerDetail.default_address.shipping_address;
		
		}
	
		
	
		return (
		
			<View style={styles.container}>
				
				
				
				
				<ScrollView>
			 
					<View style={styles.cell}>
						
					
					<TouchableOpacity
						onPress={()=>this._setAddress()}>
						<Text>
							{shippingInfo}
						</Text>
					
					</TouchableOpacity>
					
					</View>




				<View style={styles.cell}>
				
				 <ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this._renderProduct(rowData)} />
				
				</View>
					
	
					
					
					
				</ScrollView>
					
				
				
				
				
				
	
				
				
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
	}
	
	


});



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
