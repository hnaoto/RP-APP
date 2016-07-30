

exports.post = function(url, body){
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
		.then(response => response.json())
		.then((responseData) => {
			console.log(responseData);
			if (typeof responseData.token == 'undefined'){
				Alert.alert('用户名或者密码错误');
			}else{
				window.TOKEN = responseData.token;
			  this._setToken(responseData.token);
			}

		})
		.catch(error =>
			this.setState({
				message: '系统故障，请稍后重试' + error
		}));
	
}







exports.get = function(url, headers, callback){
		fetch(url, {
			method: 'GET',
			headers: headers ,
		})
		.then(response => response.json())
		.then((responseData) => {
			callback(responseData);
		})
		.catch(error =>
			this.setState({
				message: '系统故障，请稍后重试' + error
		}));
	
}

