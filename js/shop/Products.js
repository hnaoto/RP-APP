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
		Image
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

		 
	
    }
  }



  componentDidMount() {
		this._get(base_url + get_products + this.props.gpsID);
		this.props._hideNav();
		
	}
	

  _get(url) {
		console.log(url)
		fetch(url)
		.then(response => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData)
				});
		})
		.catch(error =>
			this.setState({
				message: 'Something bad happened ' + error
		}));

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



	render() {
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