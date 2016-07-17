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
import ControlPanel from './ControlPanel'
import Main from './Main.ScrollableTabView'
import Header from './Header';



export default class ShopView extends Component {
  state={
    drawerOpen: false,
    drawerDisabled: false,
  };
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  render() {
	
	
    return (
		
						
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={
          <ControlPanel closeDrawer={this.closeDrawer} />
        }
        acceptDoubleTap
        styles={{main: {shadowColor: '#BBB', shadowOpacity: 0.3, shadowRadius: 15}}}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={0.2}
        panOpenMask={0.2}
        negotiatePan
        >
			<Header/>

      <Main gpsID={this.props.gpsID}  />
      </Drawer>
    )
  }
}

