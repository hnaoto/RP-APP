

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
		TouchableOpacity,
		ListView,
	
} from 'react-native';



import * as GLOBAL from '../config/Global';



export default class ReviewPage extends Component {



	constructor(props){
		super(props);
    this.state = {
		 dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
			}),
	
    }
	}
	
	

	componentDidMount(){
		this._getReviews(GLOBAL.URL.ALL_BC_REVIEW);
	}
	
	
	
	_stars(count) {
	  var result = '';
		
		if (count != '') {
			for (var i = 0; i < Math.round(count); i++) {
				result += '★';
			}
		}
	
		return result;
	}
	
	

  _getReviews(url) {
	
		fetch(url)
		.then(response => response.json())
		.then((responseData) => {
			console.log(responseData);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData)
			});
		})
		.catch(error =>
			{console.log(error.message)}
		);

  }
	
	
	
	_renderReview(review) {
	
		var rating = this._stars(review.rating);

		return (
			<View style={styles_list.container}>
				<View style={styles_list.headContainer}>
					
					<Text style={styles_list.username}>
						{review.username}
					</Text>
					
					<Text style={styles_list.timestamp}>
						{review.timestamp}
					</Text>
					
				</View>
				
				
				<View style={styles_list.commentContainer}>
				
					<Text style={styles_list.rating}>
					 {rating}
					</Text>
					
						
				
					<Text style={styles_list.commentText}>
						{review.comment}
					</Text>
				</View>
				
				
			</View>
		);
	}
	
	
	
	
	render() {
    return (
			<View>
				
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderReview.bind(this)}
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

});

var styles_list = StyleSheet.create({
  container: {
    flexDirection: 'column',
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		paddingLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,

  },
	headContainer: {
		flexDirection: 'row',
		borderBottomColor: '#DDD',
		borderBottomWidth: 1,
		padding: 10,
		flex: 1,
		
	},
	username: {
		fontSize: 16,
		flex: 1,
	
	},
	
	timestamp: {
		color: '#666',
		fontSize: 12,
		textAlign: 'right',
		flex: 1,
	},
	commentContainer:{
		padding: 10,

	
	},
	

	commentText: {
		fontSize: 14,
		width: 350,
	
	},
	rating: {
		color: '#EA8530',
		fontSize: 14,
		paddingBottom: 5,
	},

	
});

