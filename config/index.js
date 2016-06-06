var configValues = require('./config');

module.exports = {

	getDbConnectionString: function() {
		return 'mongodb://' + configValues.server + ':' + configValues.pwd + '@ds023373.mlab.com:23373/votel';
	}

}