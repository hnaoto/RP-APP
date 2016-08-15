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
		TouchableOpacity
} from 'react-native';






import Drawer from 'react-native-drawer'
//import Main from './Main.ScrollableTabView'
import SearchBar from './SearchBar';


import ProductPage from './Products';
import ReviewPage from './Reviews';
import ShopDetailPage from './ShopDetail';
import SearchResults from './SearchResults';
import Category from './Category';


import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';


export default class ShopView extends Component {

	constructor(props){
		super(props);
		this.state = ({
			kw: '',
			products: {},
		});
	
	}



	

	
	
	_setProducts(data){
		this.setState({
			products: data,
		})
	
	}
	
	
		
	_hideText(){
		console.log('hide');
	
		this.setState({
			kw: '',
		});
	
	}
	
	
	
	_search(text){
	
	
		this.setState({
			kw: '',
		});
		
		console.log(this.state.kw);
		
		
		this.props.navigator.push({
			component: SearchResults,
			passProps: {
				products: this.state.products,
				kw: text,
				_showNav: this.props._showNav.bind(this),
				_hideText: this._hideText.bind(this),
			},
			title: '搜索结果',
			navigationBarHidden: true,
		
		});
	
		
		
		
		
	}
	
	
	
	
	_categoryOnPress(){
		this.props.navigator.push({
			component: Category,
			title: '商品分类',
			passProps: {
				products: this.state.products,
			
			}
			//navigationBarHidden: true,
		
		});
	
	}
	
	
	

  render() {
	
    return (
		
		<View style={styles.container}>
			<SearchBar navigator={this.props.navigator}
								_categoryOnPress={this._categoryOnPress.bind(this)}
								 _hideText={this._hideText.bind(this)}
								 _search= {this._search.bind(this)}
								 _showNav={this.props._showNav.bind(this)}
								 hideNav={this.props.hideNav}
								 kw={this.state.kw}/>

			<ScrollableTabView
				style={{marginTop: 20, flex:1,}}
				renderTabBar={() => <DefaultTabBar />}>
					<ProductPage 
						tabLabel='店内产品' 
						gpsID={this.props.gpsID}
						navigator={this.props.navigator}
						_showNav={this.props._showNav.bind(this)}
						_hideNav={this.props._hideNav.bind(this)}
					  kw={this.state.kw}
						_setProducts={this._setProducts.bind(this)}/>
					<ReviewPage tabLabel='用户评价' />
					<ShopDetailPage tabLabel='店铺详情' />
			</ScrollableTabView>
    </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
})

