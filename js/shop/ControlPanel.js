
import React, { Component, PropTypes} from 'react';
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
		TouchableHighlight
	
} from 'react-native';


export default class ControlPanel extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };

  render() {
    let {closeDrawer} = this.props
    return (
      <ScrollView style={styles.container}>
			

        <TouchableOpacity style={styles.button} onPress={closeDrawer}>
          <Text style={styles.buttonText}> x </Text>
        </TouchableOpacity>
				
				
				
			<TouchableHighlight onPress={() => this.rowPressed(rowData.title)}
        underlayColor='#dddddd'>
		
						
				<View style={styles.cateContainer}>
					<Text style={styles.controlText}>Control Panel</Text>
        </View>

      
    </TouchableHighlight>


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EEE',
  },
  controlText: {
    color: '#777',
  },
  button: {
    backgroundColor: '#999',
    borderWidth: 1,
    borderColor: '#999',
    padding: 2,
		width:27,
		borderRadius: 3,
		position:'absolute',
		right: 0
	},
	buttonText: {
		color:'#FFF',
		fontSize: 21,
		fontWeight: '800',
		textAlign: 'center',
	},
	cateContainer: {
    flexDirection: 'row',
		borderBottomColor: '#ECECFB',
		borderBottomWidth: 1,
		paddingLeft: 10,
		paddingTop: 5,
		paddingBottom: 5,
		height: 90,
		backgroundColor: '#FFF',
		alignSelf:'stretch'
	}
	
})