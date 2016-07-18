'use strict';

var AutoComplete = require('react-native-autocomplete');
var Countries = require('./countries.json');

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    AlertIOS,
		Image,
		Platform,
		TouchableHighlight,
		NavigatorIOS,
} from 'react-native';


export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: Countries
    };
  }
	
	
	

   onTyping(text){
		var countries = Countries.filter(function (country) {
			return (country.name).indexOf(text) > -1 ?  true : false;
		}).map(function (country) {
			return country.name;
		});
			this.setState({data: countries});
    }


	_onPressButton(event) {
		this.navigator.pop();
		this._showNav();
		
	}


  render() {
        return (
	      <View>
					<View style={styles_header.container}>
						<View style={styles_header.searchBox}>
	
						
							<Image source={require('./images/header/icon_search.png')} style={styles_header.searchIcon}/>
							<TextInput
							keyboardType='web-search'
							placeholder='搜索京东商品/店铺'
						  style={styles_header.inputText}/>
						</View>


						<TouchableHighlight
							underlayColor={styles_header.cancelButton}
							onPress={this._onPressButton}
							navigator={this.props.navigator}
							_showNav={this.props._showNav}>
							<Text style={styles_header.cancelButton} >
								取消
							</Text>
						</TouchableHighlight>
					
					</View>

				
				</View>
								
        );

  }
}


var styles = StyleSheet.create({
    autocomplete: {
				alignSelf: 'stretch',
        height: 50,
				fontSize: 14,
        backgroundColor: 'white',
				
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
			
    },
		searchBox: {
        flex: 1,
        borderRadius: 5,
				backgroundColor: '#26634F',

    },  

});


const styles_header = StyleSheet.create({
    container: {  
        flexDirection: 'row',   // 水平排布  
        paddingLeft: 10,  
        paddingRight: 10,  
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏  
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏  
        backgroundColor: '#26634F',
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中  
    },  
    logo: {  
        height: 24,  
        width: 64,  
        resizeMode: 'stretch'  // 设置拉伸模式  
    },  
    searchBox: {  
        height: 30,  
        flexDirection: 'row',  
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充  
        borderRadius: 5,  // 设置圆角边  
        backgroundColor: 'white',  
        alignItems: 'center',  
        marginLeft: 8,  
        marginRight: 12  
    },  
    cancelButton: {
        height: 26.7,  
        width: 30,
				color: '#FFF',
				paddingTop: 5.5,
		},
    searchIcon: {  
        marginLeft: 6,  
        marginRight: 6,  
        width: 16.7,  
        height: 16.7,  
        resizeMode: 'stretch'  
    },  
    voiceIcon: {  
        marginLeft: 5,  
        marginRight: 8,  
        width: 15,  
        height: 20,  
        resizeMode: 'stretch'  
    },  
    inputText: {  
        flex: 1,  
        backgroundColor: 'transparent',  
        fontSize: 14,
				alignSelf:'stretch'
    }




});