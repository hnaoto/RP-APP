'use strict'

import React, { Component,  PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    AlertIOS,
		Navigator,
		MainView,
		ScrollView,
		TouchableOpacity,
		ListView,
		NavigatorIOS,
		Image,
		ActivityIndicator,
} from 'react-native';





import ProductView from './ProductView';


var base_url = 'http://rp-backend.herokuapp.com/api/';
var get_products = 'bcs/products/?format=json&gps_id=';


export default class ProductPage extends Component {


  constructor(props) {
    super(props);

    this.state = {
		 dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		 message: '',
		 loaded: false,
		 error: false,

	
    }
  }


	


  componentDidMount() {
		var _this = this;
	
		this._timeoutPromise(5000, fetch(base_url + get_products + this.props.gpsID))
		//.then(function(response) {
		.then(response => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData),
				loaded: true,
			});
			this.props._setProducts(responseData);
		})
		.catch(function(error) {
			console.log('error');
		
		
			_this.setState({
				message: '服务器超时，请重试',
				error: true,
				loaded: true,
			});

		
		});
	
		this.props._hideNav();
		
	}
	
	
	



   _searchProducts(){
		
		var products = Products.filter(function (product) {
			return (product.kw).indexOf(text) > -1 ?  true : false;
		}).map(function (product) {
			return product.name;
		});
			this.setState({data: products});
    }
	
	

  _getProducts(url) {
		fetch(url)
		.then(response => response.json())
		.then((responseData) => {
			console.log(responseData);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData),
				loaded: true,
			});
			this.props._setProducts(responseData);
		})
		.catch(error =>
			this.setState({
				message: '服务器故障，请重试',
				error: true,
		}));

  }
	
	
	

 _timeoutPromise(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}
	
	
	
	
	
	_productRowPressed(product){
		
		this.props.navigator.push({
			component: ProductView,
			passProps: {
				product: product,
				hideNav: this.props.hideNav,
				_hideNav: this.props._hideNav,
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


	_renderLoadingView() {
		return (
			<View style={styles.container}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size='large'/>
					<Text style={styles.loadingText}> 加载商品中，请稍候..</Text>

				</View>
			
			
		
			</View>
		
		
		);
	}


	_renderErrorView() {
		console.log('errorr');
		return (
			<View style={styles.container}>
					<Text style={styles.loadingText}> {this.state.message}</Text>
			</View>
		
		
		);
	}

	render() {
		
		if (this.state.erroe) {
			return this._renderErrorView();
		}		
		
		if (!this.state.loaded) {
			return this._renderLoadingView();
		}
		
    return (
			<View style={styles.container}>
			
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
		flex : 1,
		justifyContent: 'center',
	},
	loadingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	
	},
	loadingText: {
		fontSize: 18,
		color: '#666',
	
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