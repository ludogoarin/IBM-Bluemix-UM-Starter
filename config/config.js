'use strict';

var bluemix  = require('./bluemix'),
    env       = process.env.VCAP_SERVICES ? 'prod' : 'dev';

var services = {
    user_modeling: {
        "password": "<password>",
        "url": "<url>",
        "username": "<username>"
    },

    twitter: {
        consumer_key:       '<consumer_key>',
        consumer_secret:    '<consumer_secret>',
        access_token_key:   '<access_token_key>',
        access_token_secret:'<access_token_secret>'
    }
};

// Get the service
if (env === 'prod') {
    services.user_modeling = bluemix.serviceStartsWith('user_modeling');
}

module.exports = {
    services: services,
    host: '127.0.0.1',
    port: 3000
};