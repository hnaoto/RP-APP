

// import Swiper from 'react-native-swiper'
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  AlertIOS,
  ScrollView,
  NavigatorIOS,
  TextInput,
  Platform
} from 'react-native';



var Swiper = require('react-native-swiper');
import Header from './Header';
import SearchBar from './SearchBar';






export default class Content extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }
	
	

  componentDidMount() {
    this.setState({
      items: [
        { title: 'Hello Swiper', css: styles.slide1, image:require('./images/banner/1.jpg') },
        { title: 'Beautiful', css: styles.slide2, image:require('./images/banner/2.jpg') },
        { title: 'And simple', css: styles.slide3,  image:require('./images/banner/3.jpg')  }
      ]
    })
  }
	
	
	
	
 	_handleFocus(event){
	
		this.props.navigator.push({
		  title: 'Results',
		  component: SearchBar,
			navigationBarHidden: true
		});
	
	}

	
  render() {
    return (
			<View>
			
				<View style={styles_header.container}>
					<View style={styles_header.searchBox}>
						<Image source={require('./images/header/icon_search.png')} style={styles_header.searchIcon}/>
						<TextInput
							placeholder='请输入搜索商品名称'
							style={styles_header.inputText}
							onFocus={(event) => this._handleFocus(event)} />
					</View>
					<Image source={require('./images/header/icon_qr.png')} style={styles_header.scanIcon}/>
				</View>
	
			
			<Swiper style={styles.wrapper}
				height={215} horizontal={true} autoplay={true}
				dot={<View style={styles.dot}/> }
				activeDot={<View style={styles.activeDot}/> }>
			
				{this.state.items.map((item, key) => {
					return (
						<View key={key} style={item.css}>
							<Image style={styles.image} source={item.image}/>
						</View>
					)
			  })}
			</Swiper>


      </View>

		
	  
	  
	);
  }
	
}






var styles = StyleSheet.create({
  container:{
   flex:1,
  },
  wrapper: {

  },
  nav: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    flex: 1,
	height:215,
	width: 375,
	resizeMode: 'stretch'
  },
  
  dot: {
	backgroundColor:'rgba(0,0,0, 0.4)',
	width: 5,
	height: 5,
	borderRadius: 4,
	marginLeft: 3,
	marginRight: 3,
	marginTop: 3,
	marginBottom: 3,
  },
  activeDot: {
	backgroundColor: '#FFF',
	width: 8,
	height: 8,
	borderRadius: 4,
	marginLeft: 3,
	marginRight: 3,
	marginTop: 3,
	marginBottom: 3,
  
  }
  
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



