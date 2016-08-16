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

export default class SearchResults extends Component {

		
	constructor(props){
		super(props);
	
		this.state = ({
			products: this.props.products,
			kw: this.props.kw,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2}),
		});
			
			
		
		}
	
	componentDidMount(){
	
		console.log(this.props.kw);
		console.log(this.state.kw);
		this._search();
		
	}
	
	
	
	
	
	
	
	
	_search(text){
	
	
	
		

		if (text){
			this.setState({
				kw: text,
			});
		}
		
		
	
		var products = this.state.products;
		var kw = text ? text : this.state.kw;
		
	
		
		
		var results = products.filter(function (product) {
			return (product.basic_info.name).indexOf(kw) > -1 ?  true : false;
		}).map(function (product) {
			return product;
		});
		
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(results)
		});
		
	
	
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


	
	
	
	
	
	
	
	
	render(){
	
		
		
		
		return(
		
			<View style={styles.container}>
			
			
			
			<SearchBar navigator={this.props.navigator}
									kw= {this.state.kw}
								 _search= {this._search.bind(this)}
								 _showNav={this.props._showNav.bind(this)}
								 _hideText={this.props._hideText.bind(this)}/>
					 
					 
					 
			
				<ListView
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



