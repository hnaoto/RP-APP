'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableOpacity,
  ListView,
  Image,
	AsyncStorage,
	ScrollView
} from 'react-native';






export default class Cart extends React.Component {
	
	
		
		constructor(props){
			super(props);
			this.state = {
				products:	[],
				price: 0,
				dataSource: new ListView.DataSource({
					rowHasChanged: (row1, row2) => row1 !== row2,
				}),
			}
		
		}
		
		componentWillMount() {
			this._loadInitialSate().done()
		}
	

		
		
		async _loadInitialSate() {
			var _this = this;
			try {
				var keys = await AsyncStorage.getAllKeys();
		
				if (keys != null) {
				var SP_keys = keys.filter(function(key){
						return key.startsWith('BC-P');
						
				});
				
				AsyncStorage.multiGet(SP_keys,function(errs,result){
                var arr = [];
                for(var i in result){
                    arr.push(JSON.parse(result[i][1]));
                }
                _this.setState({
                    products:arr,
										dataSource: _this.state.dataSource.cloneWithRows(arr),
                });
            });
				
				
					
			}
				
			} catch(error) {
				console.log(error.message);
			}
		
	
	
		}
	
		
			
			
			
	_renderProduct(product) {
		
	 return(

			
			<View>
			
			
			<View style={styles_list.shopContainer}>
			<Text>
			 xxxxx店名
			</Text>
			</View>
			
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
			
			</View>
			
		);
	}





	render() {


		var productList = null;
		var price = 0;
		if(this.state.products.length!=0){
		
			productList  = (
					<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderProduct.bind(this)}
					style={styles_list.listView}
       />);
	
	

		}
		
		return (
			<View style={styles.container}>
				{productList}
			</View>
		
		
		
		)
	
	
	
	}

}





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
	},
	shopContainer: {
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
		
	
	},
});


var styles = StyleSheet.create({
    container : {
        flex: 1
    },

    row : {
        flexDirection: 'row',
        marginBottom: 10,
    },

    item : {
        flex: 1,
        marginLeft:5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 5,
        height: 100,
    },

    img: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    item_text: {
        backgroundColor: '#000',
        opacity:0.7,
        color:'#fff',
        height:25,
        lineHeight:18,
        textAlign:'center',
        marginTop:74
    },

    btn: {
        backgroundColor: '#ff7200',
        height: 33,
        textAlign : 'center',
        color: '#fff',
        marginLeft:10,
        marginRight: 10,
        lineHeight: 24,
        marginTop: 40,
        fontSize: 18,
    },

    list_item : {
        marginLeft: 5,
        marginRight: 5,
        padding:5 ,
        borderWidth: 1,
        height: 30,
        borderRadius: 3,
        borderColor: '#ddd',
    },

    list_item_desc : {
        flex: 2,
        fontSize: 15,
    },

    list_item_price: {
        flex: 1,
        textAlign: 'right',
        fontSize: 15,
    },

    clear: {
        marginTop : 10,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#ddd',
        borderWidth:1,
        marginLeft: 10,
        marginRight:10,
        lineHeight: 24,
        height:33,
        fontSize: 18,
        textAlign: 'center',

    }

});
