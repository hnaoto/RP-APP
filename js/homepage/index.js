

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
  Alert,
  ScrollView
} from 'react-native';



var Swiper = require('react-native-swiper')
import Header from './Header'


var styles = StyleSheet.create({
  wrapper: {

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
  
  
  
})



export default class HomePage extends React.Component {
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





	
  render() {
    return (
      <View>
	    <Header/>
        <Swiper style={styles.wrapper}
			height={215} horizontal={true} autoplay={true}
			dot={<View style={styles.dot}/> }
			activeDot={<View style={styles.activeDot}/> }
		>
		
        {this.state.items.map((item, key) => {
          return (
            <View key={key} style={item.css}>
				<Image style={styles.image} source={item.image}/>
            </View>
          )
		})}
        </Swiper>




      </View>
	  
	  
	  
	)
  }
	
}


//module.exports = HomePage;
