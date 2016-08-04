

exports.errorAlert = function(message){
	Alert.alert(
		message,
		null,
		[
		 {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
		]
	);
	
}

