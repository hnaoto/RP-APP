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
		TouchableOpacity,
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
					
					
										
						<TouchableOpacity
							onPress={this._onPressButton}
							navigator={this.props.navigator}
							_showNav={this.props._showNav}>
							<Image
								source={require('./images/product/back_gray.png')}
								style={styles_header.backButton}
							/>
						</TouchableOpacity>
						
						
						<View style={styles_header.searchBox}>
	           	
					
						<Image source={require('./images/header/icon_search.png')} style={styles_header.searchIcon}/>
						
							
		
							<TextInput
								onSubmitEditing={(event) => this.props._search(event.nativeEvent.text)}
								keyboardType='web-search'
								placeholder='搜索店内商品'
								style={styles_header.inputText}/>
						</View>
						
						<Image
							source={require('./images/product/category.png')}
							style={styles_header.categoryButton}/>
						
						

					
					</View>

				
				</View>
								
        );

  }
}




const styles_header = StyleSheet.create({
    container: {  
        flexDirection: 'row',
        paddingLeft: 10,  
        paddingRight: 10,  
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        height: Platform.OS === 'ios' ? 68 : 48,
        backgroundColor: '#fff',
        alignItems: 'center'  ,
				borderBottomWidth: 1,
				borderBottomColor: '#DDD',
				
    },  
    logo: {  
        height: 24,  
        width: 64,  
        resizeMode: 'stretch'
    },  
    searchBox: {  
        height: 30,  
        flexDirection: 'row',  
        flex: 1,
        borderRadius: 5,
        backgroundColor: 'white',  
        alignItems: 'center',  
        marginLeft: 8,  
        marginRight: 12,
				backgroundColor: '#f8f8f8',
    },  
    backButton: {
        height: 26.7,  
        width: 30,
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
    },
		categoryButton: {
			paddingTop:5.5,
			height: 36,
			width: 28,
			
		
		},




});