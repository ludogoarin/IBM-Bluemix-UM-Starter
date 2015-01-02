/* Copyright IBM Corp. 2014
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var request = require('request');

/**
 * Check if the service/request have error and try to format them.
 * @param  {Function} cb the request callback
 */
function formatErrorIfExists(cb) {
    return function(error, response, body) {
        // If we have an error return it.
        if (error || !body) {
            cb(error, body);
            return;
        }

        try {
            body = JSON.parse(body);
        } catch (e) {}

        // If we have a response and it contains an error
        if (body && (body.error || body.error_code)) {
            error = body;
            body = null;
        }

        // If we still don't have an error and there was an error...
        if (!error && (response.statusCode < 200 || response.statusCode >= 300)) {
            error = { code: response.statusCode, error: body };
            body = null;
        }
        cb(error, body);
    };
}

function UserModeling(options) {
    // Strip trailing slash
    this.url = options.url.replace(/\/$/, '');

    // Basic Auth
    this.auth = 'Basic ' + new Buffer(options.username + ':' + options.password).toString('base64');
}

UserModeling.prototype.profile = function(params, callback) {
    var options = {
        method: 'POST',
        url: this.url + '/api/v2/profile',
        body: params,
        json: true,
        headers: { 'Authorization': this.auth }
    };
    return request(options, formatErrorIfExists(callback));
};

module.exports = UserModeling;