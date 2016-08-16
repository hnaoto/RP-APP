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
	TouchableWithoutFeedback,
} from 'react-native';


import CategoryView from './CategoryView';


export default class Category extends Component {



	constructor(props) {
		super(props);
		var data = [
    {
        "id": 1,
        "name": "盒装"
    },
    {
        "id": 2,
        "name": "精肉"
    },
    {
        "id": 3,
        "name": "骨类"
    },
    {
        "id": 4,
        "name": "带皮类"
    },
    {
        "id": 5,
        "name": "带膘类"
    },
    {
        "id": 6,
        "name": "碎肉类"
    },
    {
        "id": 7,
        "name": "膘油类"
    },
    {
        "id": 8,
        "name": "副产"
    }
		];
		
		var ds = new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
		});
		
		this.state = {
			dataSource: ds.cloneWithRows(data),
		};
	}
	
	
	componentDidMount(){
	
	
	
	
		//_getCategory();
		
		
		
		
	}
	
	
	_getCategory(url){
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
	}
	
	
	_rowPressed(cid){
	
		this.props.navigator.push({
			component: CategoryView,
			passProps: {
				products: this.props.products,
				cid: cid,
				_productRowPressed: this.props._productRowPressed,
				navigator: this.props.navigator,
			}
		});
	
	}
	
	
	
	_renderCategory(category){
	
		return(
			<TouchableWithoutFeedback
				onPress={ () => this._rowPressed(category.id) }>
		
				<View style={styles_list.container}>
					<Text style={styles_list.name}> {category.name} </Text>
				</View>
	
			</TouchableWithoutFeedback>
		
		);
	
	}
	
	
	render() {
		
		return(
		
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderCategory.bind(this)}
					style={styles.listView}
				/>
			</View>
		
		);
	
	}
	
	


}








var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
       
    backgroundColor: '#F8F8F8',
  },

});


var styles_list = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFF',
		padding: 13,
		borderBottomWidth: 1,
		borderBottomColor:'#EEE',
  },
	name: {
		fontSize: 17,
	
	},
	

});
