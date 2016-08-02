'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator
} from 'react-native';




import TabNavigator from 'react-native-tab-navigator';
import HomePage from './js/homepage/content';
import Shop from './js/shop/index';
import Account from './js/account/content';
import Cart from './js/cart/Content';



const HOME = 'home';
const HOME_NORMAL = require('./images/tabs/home_normal.png');
const HOME_FOCUS = require('./images/tabs/home_focus.png');
const CATEGORY = 'category';
const CATEGORY_NORMAL = require('./images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('./images/tabs/category_focus.png');
const FAXIAN = 'faxian';
const FAXIAN_NORMAL = require('./images/tabs/faxian_normal.png');
const FAXIAN_FOCUS = require('./images/tabs/faxian_focus.png');
const CART = 'cart';
const CART_NORMAL = require('./images/tabs/cart_normal.png');
const CART_FOCUS = require('./images/tabs/cart_focus.png');
const PERSONAL = 'personal';
const PERSONAL_NORMAL = require('./images/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('./images/tabs/personal_focus.png');





export default class MainScreen extends Component {
	 constructor(props) {
		super(props);
		this.state = {
				selectedTab: HOME,
				hideNav: false,
			
			}
	 }
	

	

	
	
    _renderTabItem(img, selectedImg, tag, childView) {  
        return (  
            <TabNavigator.Item  
                selected={this.state.selectedTab === tag}  
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}  
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}  
                onPress={() => this.setState({ selectedTab: tag })}>  
                {childView}  
            </TabNavigator.Item>  
        );  
    }
	
	

    _createChildView(tag) {
        return (
            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>{tag}</Text>
            </View>
        )
	}



		_showNav(){
		  this.setState(
				{hideNav: false}
			);
		
		}
	
	
    _hideNav(){
		  this.setState(
				{hideNav: true}
			);
			
		}
	


	
    render() {
			let tabBarHeight = 0;
			var hn = this.state.hideNav ?
					 (<TabNavigator
							hidesTabTouch={true}
							tabBarStyle={styles.tab}
							tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
							sceneStyle={{ paddingBottom: tabBarHeight }}>
						
							{this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage navigator={this.props.navigator} _hideNav={this._hideNav.bind(this)} _showNav={this._showNav.bind(this)}  hideNav={this.state.hideNav}   /> )}
						</TabNavigator>)
						:
						(<TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
							{this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage navigator={this.props.navigator} _hideNav={this._hideNav.bind(this)}  _showNav={this._showNav.bind(this)}  hideNav={this.state.hideNav} /> )}
							{this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, this._createChildView(CATEGORY)  )}
							{this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, <Shop/>   )}
							{this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, <Cart navigator={this.props.navigator}  />)}
							{this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL,  <Account navigator={this.props.navigator} />)}
						</TabNavigator>);
			
		
		 
        return (
					<View style={{flex:1}}>
						{hn}
					</View>
        );
    }
}










var styles = StyleSheet.create({
	tab: {
		height: 52,
		backgroundColor: '#FFF',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor:'#BBB',
	},
	tabIcon: {
		width: 30,
		height: 35,
		resizeMode: 'stretch',
		marginTop: 10  
	}
});





