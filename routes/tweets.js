var express = require('express');
var router  = express.Router(),
    Q       = require('q');

router.get('/tweets/@:username', function(req, res) {
  var username = req.params.username;
  if (!username)
    return res.render('tweets', {info: 'You need to provide a username.', title: 'Watson PoC'});

  // Declare some promises to handle database/twitter and user_modeling req
  var showUser   = Q.denodeify(req.twit.showUser.bind(req.twit)),
      getTweets  = Q.denodeify(req.twit.getTweets.bind(req.twit)),
      getProfile = Q.denodeify(req.user_modeling.profile.bind(req.user_modeling));


  console.log('getting user timeline');

  showUser(username)
      .then(function(user) {
        console.log('username:', username);

        if (!user)
          return;
        else if (user.protected)
          return res.render('tweets', {
            info: '@' + username + ' is protected, try another one.',
            title: ''
          });

        // get the user's tweets and profile
        return getTweets(username)
            .then(function(tweets) {
              console.log(username, 'has', tweets.length, 'tweets');
              return getProfile({contentItems:tweets})
                  .then(function(profile) {
                    if (!profile)
                      return;
                    console.log(username, 'analyze with user modeling');

                    user.profile = profile;
                    return user;
                  });
            });

      })

      .fail(function (error) {
        console.log('fail():',error);
        var ret = { user: {screen_name:username}};
        var status = 500;
        if (error.statusCode === 429)
          ret.info = 'Twitter rate limit exceeded, come back in 15 minutes.';
        else if (error.statusCode === 404) {
          ret.info = 'Sorry, @' + username+' does not exist.';
          status = 404;
        } else if (error.error || error.error_code) {
          ret.info = 'Sorry, our analysis requires 100 unique words. ' +
          'We weren\'t able to find that many words in @'+ username+' tweets.';
          status = 400;
        } else {
          ret.error = 'Sorry, there was an error. Please try again later.';
        }

        res.status(status);
        res.render('index',ret);

        // return null because we already fulfill the response
        return null;

      })

      .done(function(result){
        console.log('done()');
        if (result){

          // debug the tree
          /*
          for(var i=0; i<result.profile.tree.children.length; i++) {
            var topItem = result.profile.tree.children[i];

            console.log('topItem.name ' + i + ': ' + topItem.name);

            for (var si = 0; si < topItem.children.length; si++) {
              var subItem = topItem.children[si];
              console.log('subItem (' + si + ')');
              console.log(subItem);

            }
          }
          */

          // return
          res.render('tweets', { info: "Got user tweets", title: 'Watson PoC', user: result });

        }
      });

});

/*
router.get('/tweets/@:username', function(req, res) {
*/

module.exports = router;
