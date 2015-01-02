'use strict';

/**
 * if VCAP_SERVICES exists then it return the username, password and url for
 * a service that starts with 'name' or {} otherwise
 * @param  String name The service name
 * @return [Object] the service credentials or {} if
 * name is not found in VCAP_SERVICES
 */

module.exports.serviceStartsWith = function(name) {
    if (process.env.VCAP_SERVICES) {
        console.info('Parsing VCAP_SERVICES');
        var services = JSON.parse(process.env.VCAP_SERVICES);
        for (var service_name in services) {
            if (service_name.indexOf(name) === 0 ) {
                var service = services[service_name][0];
                return {
                    url: service.credentials.url,
                    username: service.credentials.username,
                    password: service.credentials.password
                };
            }
        }
        console.log('The service '+name+' is not in the '+
        'VCAP_SERVICES, did you forget to bind it?');
    } else {
        console.log('No VCAP_SERVICES found in ENV, '+
        'using defaults for local development');
    }
    return {};
};