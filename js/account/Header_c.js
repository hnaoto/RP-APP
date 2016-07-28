'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
	Platform,
	TouchableOpacity,
} from 'react-native';

export default class Header extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			loggedIn: false,
			username: '登录/注册',
			profileImg: {src: require('./images/icon/profile.png') }
		});
		
	}


	componentDidMount() {
		console.log(window.TOKEN)
		console.log(this.props.TOKEN);
		if (typeof window.TOKEN != 'undefined') {
			this.setState({
				loggedIn: true,
				username: '用户名',
				
			});
		}
	}
	
	componentWillReceiveProps(){
		if (typeof window.TOKEN != 'undefined') {
			this.setState({
				loggedIn: true,
				username: '用户名',
				
			});
		}
	}
	
	
	

	

	
	

  render() {
	
	
		
	
	
    return (
		
			<View style={styles.container}>
			
				<TouchableOpacity
					style={styles.configContainer}
					onPress={() => this.props._config()}>
					<Image
						source={require('./images/icon/config.png')}
						style={styles.configImg}
						/>
				</TouchableOpacity>
				<TouchableOpacity  onPress={() => this.props._login()}>
				<View style={styles.profileContainer}>
					<Image
						source={this.state.profileImg.src}
						style={styles.profileImg}/>
				 </View>
				 </TouchableOpacity>
				<Text style={styles.username}> {this.state.username}</Text>
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
		height: Platform.OS === 'ios' ? 148 : 128,
		backgroundColor: '#365F4E',
		alignItems: 'center'
	},
	username: {
		color: '#FFFFFF',
		fontSize: 16,
		marginLeft: 10,
	},
	profileContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		height: 70,
		width: 70,
		marginLeft: 10,
		shadowColor: '#DDD',
		shadowOpacity: 0.5,
		shadowOffset: {
      height: 1,
      width: 0
    }
	},
	profileImg: {
		height: 65,
		width: 65,
		marginTop: 2.5,
		alignSelf: 'center',
	
	},
	configContainer: {
		height: 25,
		width: 25,
		position: 'absolute',
		right: 20,
		top: 32,
	
	},
	configImg: {
		height: 25,
		width: 25,

	
	},
		
		
});