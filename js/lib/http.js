





exports.GET = function(url, callback) {
		fetch(query)
		.then(response => response.json())
		.then((responseData) => {
			this.setState({
				callback(responseData)
			})
		.catch(error =>
			this.setState({
				message: 'Something bad happened ' + error
		}));

  }

