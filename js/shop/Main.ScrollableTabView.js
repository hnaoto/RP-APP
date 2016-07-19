

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




import ProductPage from './Products';
import ReviewPage from './Reviews';
import ShopDetailPage from './ShopDetail';

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';



export default class ControlPanel extends Component {


  render() {
    return (
			<ScrollableTabView
				style={{marginTop: 20, }}
				renderTabBar={() => <DefaultTabBar />}>
					<ProductPage 
						tabLabel='店内产品' 
						gpsID={this.props.gpsID}
						navigator={this.props.navigator}
						_showNav={this.props._showNav.bind(this)}
						_hideNav={this.props._hideNav.bind(this)}/>
					<ReviewPage tabLabel='用户评价' />
					<ShopDetailPage tabLabel='店铺详情' />
			</ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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