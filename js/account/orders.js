
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
	}


	componentDidMount() {
		this._getOrders();
	
	}

	_getOrders(){
	
		http.get(GLOBAL.ALL_ORDER_URL, this.state.headers, function(data){

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(data),
			});
			
		});
	
	}




	_orderRowPressed(product){
		
		this.props.navigator.push({
			component: OrderView,
			passProps: {
				order: order,
			},
		});
	}


	
	_renderOrder(order) {
		
		return (
		
		
		
			<TouchableOpacity
				onPress={() => this._orderRowPressed(product)}>
				
				
		
      <View style={styles_list.container}>
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
							★★★★☆
						</Text>
					
					</View>
				
				
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
	},


});



var styles_list = StyleSheet.create({
  container: {
    flexDirection: 'row',
		borderBottomColor: '#ECECFB',
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
	}
});



