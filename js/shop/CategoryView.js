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



import SearchBar from './SearchBar';

import ProductView from './ProductView';


export default class CategoryView extends Component {

		
	constructor(props){
		super(props);
	
		this.state = ({
			products: this.props.products,
			cid: this.props.cid,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2}),
			  empty: false,
		});
			
			
		
		}
	
	componentDidMount(){

		this._initProducts(this.state.cid);
	}
	
	
	
	
	
	
	
	
	
	
	_initProducts(cid){
	
	
	
		var products = this.state.products;

		
		
		
		var result = products.filter(x=>x.basic_info.category.includes(cid));
		
	
		
		if (result.length > 0) {
	
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(result),
				empty: true,
			});
	
		}
	
	
	}
	
	
	
		_productRowPressed(product){
		
		this.props.navigator.push({
			component: ProductView,
			passProps: {
				product: product,
				hideNav: this.props.hideNav,
				_hideNav: this.props._hideNav,
				navigator:this.props.navigator,
			},
		});
	}
	
	
	
	_renderProduct(product) {
		
	 return(
		 
			<TouchableOpacity
				onPress={() => this._productRowPressed(product)}>
			
		
      <View style={styles_list.container}>
        <Image
          source={{uri: product.basic_info.picture_backup}}
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


	
	
  _renderEmptyView() {
    return (
      <View style={styles.container}>
        <Text>
          暂无商品
        </Text>
      </View>
    );
  }
	
	
	
	
	
	render(){
	
    if (!this.state.empty) {
      return this._renderEmptyView();
    }
		
		
		
		return(
		
			<View style={styles.container}>
			
			
	
			
				<ListView
					enableEmptySections={true}
					dataSource={this.state.dataSource}
					renderRow={this._renderProduct.bind(this)}
					style={styles_list.listView}
       />
			</View>
		
		
		);
	
	}
	


}



var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 70,
	}

});





var styles_list = StyleSheet.create({
  container: {
    flexDirection: 'row',
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
		height: 100,
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
	listView: {
		flex: 1,
	},
});



