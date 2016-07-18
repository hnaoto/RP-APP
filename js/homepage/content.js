
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
  Platform,
	ListView,
	TouchableOpacity
} from 'react-native';
var Swiper = require('react-native-swiper');
import Header from './Header';
import SearchBar from './SearchBar';
import ShopView from '../shop/index';







var map_ql = 'http://restapi.amap.com/v3/place/around?key=3048183b07370de2b2247499d8e2b75d&location=';
var map_qr = '&keywords=%E4%B8%AD%E7%B2%AE%E5%AE%B6%E4%BD%B3%E5%BA%B7%E8%82%89%E9%A3%9F&radius=13000&extensions=all';



export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		 dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      items: [],
			message: '',
			rating: '',
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
		
		this._getNearbyShop();
		
	
  }

	
	componentWillReceiveProps(){
		if (this.props.navigator.navigationContext.currentRoute.title == 'initRoute') {
			console.log('update')
		}
	
	}



	
	
 	_handleFocus(event) {
		this.props.navigator.push({
		  component: SearchBar,
			navigationBarHidden: true
		});
	
	}





  _executeQuery(query) {
		fetch(query)
		.then(response => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData.pois)
				});
		})
		.catch(error =>
			this.setState({
				message: 'Something bad happened ' + error
		}));

  }



	_getNearbyShop() {
		navigator.geolocation.getCurrentPosition(
			location => {
				var geo = location.coords.latitude + ',' + location.coords.longitude;
				var query = map_ql + geo + map_qr;
				console.log(query);
				this._executeQuery(query);
    },
    error => {
      this.setState({
        message: 'There was a problem with obtaining your location: ' + error
      });
    });
	}
	
	
	
	_stars(count) {
	  var result = '';
		
		if (count != '') {
			for (var i = 0; i < Math.round(count); i++) {
				result += '★';
			}
		}
	
		return (result += count);
	}



	_shopRowPressed(shopID){
		this.props.navigator.push({
			component: ShopView,
			passProps: {
				gpsID: shopID,
				_hideNav: this.props._hideNav,
				_showNav: this.props._showNav,
			},
			navigationBarHidden: true,

		});
	
	}


  _renderShop(shop) {
	  var photo_url = (shop.photos.length > 0) ?  {uri: (shop.photos)[0].url} : {image: require('./images/shop/shop_icon.png')}['image'] ;
		
	  var rating = this._stars(shop.biz_ext.rating);

		
     return(
			<TouchableOpacity onPress={() => this._shopRowPressed(shop.id)}>
			
		
      <View style={styles_list.container}>
        <Image
          source={photo_url}
          style={styles_list.thumbnail}
        />
					<View style={styles_list.rightContainer}>
					<View style={styles_list.titleContainer}>
						<Text style={styles_list.name}>{shop.name}</Text>
						<Text style={styles_list.distance}>{shop.distance/1000}千米</Text>
					</View>
					<Text style={styles_list.rating}>
					 {rating}
					</Text>
					
					<View style={styles_list.statusContainer}>
						<Text style={styles_list.statusText}>
						 可以自取
						</Text>
					</View>
        </View>
      </View>
			</TouchableOpacity>
    );
  }




  render() {
    return (
			<View style={styles.container}>
			
				<View style={styles_header.container}>
					<View style={styles_header.searchBox}>
						<Image source={require('./images/header/icon_search.png')} style={styles_header.searchIcon}/>
						<TextInput
							placeholder='请输入搜索商品名称'
							keyboardType='web-search'
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
			
			
			<View style={styles.sep}>
			  <Text style={styles.sepText}>
					附近门店
				</Text>
			</View>
			
	
			 <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderShop.bind(this)}
        style={styles_list.listView}
       />
	
			
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
  
  },
	sepText :{
		fontSize: 15,
		color:'#999',
		marginLeft: 15,
		marginBottom: 3,
	},
	sep: {
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		marginTop:20
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
    },



});

var styles_list = StyleSheet.create({
  container: {
    flexDirection: 'row',
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		paddingLeft: 10,
		paddingTop: 5,
		paddingBottom: 5,
		height: 90
  },
  rightContainer: {
    flex: 1,
		marginLeft: 8,
	
  },
  name: {
    fontSize: 16,
		paddingTop: 1,
		paddingRight: 3,
		fontWeight: '500',
		color:'#666'
    
  },
  year: {
    textAlign: 'center',
  },
	distance: {
    fontSize: 13,
		fontWeight: '200',
		color: '#666',
		paddingTop: 5
	
	},
  thumbnail: {
    width: 65,
    height: 70,
		
  },

	titleContainer: {
		flexDirection: 'row',
		flex: 1,
	},
	rating: {
		color: '#EA8530',
		fontSize: 12,
	},
	statusContainer: {
	  marginTop: 15,
		borderRadius: 3,
		backgroundColor: '#56A6DB',
		width: 57,
		height: 20,
		padding: 4,
	},
	statusText: {
		color: '#FFF',
		fontSize: 12,
		fontWeight: '900',
	}
});


