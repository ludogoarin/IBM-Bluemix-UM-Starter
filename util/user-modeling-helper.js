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


module.exports = {

    /**
     * Transform Tweets to ContentItems to be used
     * @param  {Twitter tweet} A tweet from the Twitter API
     */
    toContentItem : function(tweet) {
        return {
            id: tweet.id_str,
            userid: tweet.user.id_str,
            sourceid: 'twitter',
            language: 'en',
            contenttype: 'text/plain',
            content: tweet.text.replace('[^(\\x20-\\x7F)]*',''),
            created: Date.parse(tweet.created_at)
        };
    },
    /**
     * Transform a twitter user to our app user
     * @param  {Twitter User} twitter representation of a user
     * @return {models.User}     internal representation of a user
     */
    toAppUser : function(user) {
        return {
            name: user.name,
            username: user.screen_name.toLowerCase(),
            id: user.id_str,
            followers: user.followers_count,
            tweets: user.statuses_count,
            verified: user.verified,
            protected: user.protected,
            image: user.profile_image_url
        };
    },

};