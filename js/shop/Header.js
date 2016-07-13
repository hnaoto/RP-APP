'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  AlertIOS,
  NavigatorIOS,
} from 'react-native';


import SearchBar from './SearchBar';


export default class Header extends Component {

  constructor(props){
	super(props);
	this.state = {
		focusHanlder: React.PropTypes.func
	};
  }
	


	
	_handleFocus(event){
	
		this.props.navigator.push({
			title: 'Results',
			component: SearchBar,
		});
	
	
	}


    render() {
	
        return (
            <View style={styles.container}>  
  
                <View style={styles.searchBox}>  
                    <Image source={require('./images/header/icon_search.png')} style={styles.searchIcon}/>  
                    <TextInput  
                        keyboardType='web-search'  
                        placeholder='请输入搜索商品名称'
                        style={styles.inputText}
												onFocus={(event) => this._handleFocus(event)} />

                </View>  
                <Image source={require('./images/header/icon_qr.png')} style={styles.scanIcon}/>  
</View>

     );
    }
}







const styles = StyleSheet.create({
    container: {  
        flexDirection: 'row',
        paddingLeft: 10,  
        paddingRight: 10,  
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        height: Platform.OS === 'ios' ? 68 : 48,
        backgroundColor: '#CACAD9',
        alignItems: 'center'
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
        marginRight: 12  
    },  
    scanIcon: {  
        height: 26.7,  
        width: 26.7,  
        resizeMode: 'stretch'  
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
        fontSize: 14  
    }



});












