
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
import AddAddress from './AddAddress';

export default class AddressList extends Component {

	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = ({
			headers : {
				'Content-Type': 'application/json',
				'Authorization': 'token ' + window.TOKEN,
			},
			
      dataSource: ds.cloneWithRows(this.props.address),
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

	
	_addAddressOnPress(){	
		this.props.navigator.push({
			component: AddAddress,
		
		});
	}
	
	
	
	
	
	_renderAddress(address) {
	  return (
		<View style={styles_list.container}>
			<Text>
				{address.shipping_address}
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

	
		
	
		return (
		
			<View style={styles.container}>
				




				<View style={styles.cell}>
				
				 <ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this._renderAddress(rowData)} />
				
				</View>
					
	
					
				<TouchableOpacity
					style={styles.button}
					onPress={() => this._addAddressOnPress() }>
          <Text style={styles.buttonText}>新建地址</Text>
				</TouchableOpacity>
	
				
				
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
	
	button: {
		position: 'absolute',
		bottom: 25,
		left: 90,
		width: 200,
    height: 36,
    backgroundColor: '#69A44A',
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
	},
	buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
		
  },
	
	


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
