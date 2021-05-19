/*

 ___  _ _  ___  ___  ___  ___   ___  _ _  ___  _ __ _  ___  ___
| . \| | || . >| . >| __>| . \ | . \| | ||  _>| / /| || __>/ __>
|   /| ' || . \| . \| _> |   / | | || ' || <__|  \ | || _> \__ \
|_\_\`___'|___/|___/|___>|_\_\ |___/`___'`___/|_\_\|_||___><___/

Todo: Get shit done

!!!!!!! USE AirBnB ESLinter TO MATCH CODE STYLING !!!!!!!

*/

/*
  *************************
  Include required packages
  *************************
*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const babelify = require('babelify');
const browserify = require('browserify-middleware');
const google = require('googleapis');
const _ = require('underscore');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');

const db = require('./db');

// Duplicate the 'keys_copyMe.js' file, rename it 'keys.js', and paste in your Google API key
const keys = require('./keys');

const auth = keys.CLIENT_ID;

const youtube = google.youtube({ version: 'v3', auth });

const app = express();

const serverUrl = process.env.PORT || 3000;

const serverMessage = `Listening on port: ${serverUrl}`;
let currentUser = null;

/*
  *****************************************************
  Dummy objects to simulate PostgreSQL server structure
  *****************************************************
*/

// background image url: https://i.ytimg.com/vi/shTUk4WNWVU/maxresdefault.jpg

/*
const channels = [
  { id: 1, name: 'land', background: 'https://i.ytimg.com/vi/shTUk4WNWVU/maxresdefault.jpg') },
];

const users = [
  { id: 1, name: 'Joe' },
  { id: 2, name: 'Frank' },
  { id: 3, name: 'Rob' },
  { id: 4, name: 'Ryan' },
  { id: 5, name: 'Gilbert' },
];

const videos = [
  { id: 1, url: 'OMflBAXJJKc', channel_id: 1 },
  { id: 2, url: 'x76VEPXYaI0', channel_id: 1 },
  { id: 3, url: 'evj6y2xZCnM', channel_id: 1 },
];

const likes = [
  { id: 1, start: 43, stop: 48, video_id: 1, channel_id: 1, users: [1, 2, 4] },
  { id: 2, start: 74, stop: 82, video_id: 1, channel_id: 1, users: [2, 3, 4] },
  { id: 3, start: 38, stop: 42, video_id: 2, channel_id: 1, users: [1, 3, 4] },
  { id: 4, start: 70, stop: 90, video_id: 3, channel_id: 1, users: [2, 5] },
];


  // *********************************************************
  // Completed channel object should look something like this:
  // *********************************************************


const dummyObj = {
  id: 1,
  channel_name: 'land',
  background: path.join(__dirname, '../assets/land_background.jpg'),
  videos: [{
    url: 'OMflBAXJJKc',
    time_based_likes: [{
      id: 1,
      start: 43,
      stop: 48,
      video_id: 1,
      channel_id: 1,
      users: [1, 2, 4],
    }, {
      id: 2,
      start: 74,
      stop: 82,
      video_id: 1,
      channel_id: 1,
      users: [2, 3, 4],
    }],
  }, {
    url: 'x76VEPXYaI0',
    time_based_likes: [{
      id: 3,
      start: 38,
      stop: 42,
      video_id: 2,
      channel_id: 1,
      users: [1, 3, 4],
    }],
  }, {
    url: 'evj6y2xZCnM',
    time_based_likes: [{
      id: 4,
      start: 70,
      stop: 73,
      video_id: 3,
      channel_id: 1,
      users: [2, 5],
    }],
  }],
};
*/

const searchCriteria = {
  1: [
    'mountain biking',
    'skateboarding',
    'motorcross',
    'stunt biking',
    'snowboarding',
    'snow skiing',
  ],
  2: [
    'surfing',
    'jet ski',
    'wakeboarding',
    'water skiing',
  ],
  3: [
    'skydiving',
    'base jumping',
    'bungee jumping',
    'wingsuit',
  ],
};

/*
  ****************
  Middleware calls
  ****************
*/

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../assets')));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(session({secret: "funnyMonkey"}));
// passport.serializeUser(function(user, done){
//   done(null, user);
// });
// passport.deserializeUser(function(user, done){
//   done(null, user);
// });
// passport.use(new FacebookStrategy({
//     clientID: 1183004398430348,
//     clientSecret: '84d23c4f605b77e675c2738c874f807d',
//     callbackURL: "/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     db.findOrCreate(profile)
//       .then(function(user){
//         console.log(user);
//         done(null, user)
//       })

//   }
// ));

/*
  *******************
  ROUTING STARTS HERE
  *******************
*/

/*
  *******************************************
  Browserify and Babelify all files for React
  *******************************************
*/

// app.get('/app-bundle.js',
//   browserify(path.join(__dirname, '../client/src/index.js'), {
//     transform: [[babelify, { presets: ['es2015', 'react'] }]],
//   })
// );

/*
  ******************************
  Facebook authentication routes
  ******************************
*/
// GIVES YOU BACK AN OBJECT LIKE THIS!
// profile:  { id: '3619878134247',
//   username: undefined,
//   displayName: 'Kathryn Hansen',
//   name: 
//    { familyName: undefined,
//      givenName: undefined,
//      middleName: undefined },
//   gender: undefined,
//   profileUrl: undefined,
//   provider: 'facebook',
//   _raw: '{"name":"Kathryn Hansen","id":"3619878134247"}',
//   _json: { name: 'Kathryn Hansen', id: '3619878134247' } }

// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));
// app.get('/logout', function(req, res){
//   req.session.passport = undefined;
//   req.session.destroy(function (err) {
//     req.logout();
//     res.redirect('/');
//   });
// });

/*
  ***********************************************************************
  Initializes interface.

  Response object:  Index.html file
  ***********************************************************************
*/

// app.get('/', (req, res) => {

//   if(req.isAuthenticated()){
//     console.log("Authenticated as: ", req.user);
//   }else{
//     console.log("Not authenticated");
//   }
//   console.log("Req.session: ", req.session);
//   if(req.session.passport){
//     currentUser = req.session.passport.user;
//   } else{
//     currentUser = null;
//   }
//   res.sendFile(path.join(__dirname, '../client/public/Index.html'));
// });

/*
* Sends the current logged in user
*/

app.get('/currentUser', function(req, res){
    if(currentUser) res.send(currentUser);
    else res.send({name: 'Guest'})
});

/*
* Sends the user
*/

app.get('/users/:userid', function(req, res){
  db.findUser(req.params.userid)
  .then(function(user){
    console.log('User returned from get /users/:userid: ', user)
    res.send(user);
  })
})

/*
  ***********************************************************************
  Responds to requests for specific channel.
  Channels are:
    0: default -> 5 videos randomly selected from other channels
    1: land
    2: sea
    3: air

  Videos are searched for by the following criteria
    - prepended with "extreme"
    - sorted by # of views, maybe randomized?

  GET:
    Response object:
      {
        id: current channel id,
        channel_name: current channel name,
        background: background image url or asset,
        videos: array of video objects:
          {
            id: this video id,
            url: youtube url id,
            channel_id: current channel id,
            time_based_likes: array of time-based like objects:
              {
                id: current time-based like id,
                start_time: like start time (in seconds),
                stop_time: like stop time (in seconds),
                video_id: current video id,
                channel_id: current channel id
                users: array of user ids that have like this video
              }
          }
      }
  ***********************************************************************
*/

app.get('/channel/:id', (req, res) => {
  // Build channel object for response
  if (req.params.id === '1' || req.params.id === '2' || req.params.id === '3') {
    db.getChannelById(req.params.id)
    .then(channelResObj => {
      res.send(channelResObj);
    });
  } else if (req.params.id === 'default') {
    db.getDefaultChannel()
    .then(channelResObj => {
      res.send(channelResObj);
    });
  } else {
    res.status(404).send('Not a proper channel!');
  }
});

/*
  ***********************************************************************
  Responds to requests for time-based likes information
  Channel id "default" returns all time-based likes in the database

  GET:
    Response object: array of all time-based likes:
      {
        id: current time-based like id,
        start_time: like start time (in seconds from beginning of video),
        stop_time: like stop time (in seconds from beginning of video),
        video_id: current video id,
        users: array of user ids that have like this video
      }
  ***********************************************************************
*/

app.get('/channel/:id/likes', (req, res) => {
  if (req.params.id === '1' || req.params.id === '2' || req.params.id === '3') {
    db.getLikesByChannel(req.params.id).then((likesArray) => {
      res.send(likesArray);
    });
  } else if (req.params.id === 'default') {
    db.getAllLikes()
    .then(likesArray => {
      res.send(likesArray);
    });
  } else {
    res.status(404).send('Not a proper channel!');
  }
});

/*
  *********************************
  Gets the array of likes by userid
  *********************************
*/ 

app.get('/users/:userid/likes', (req, res) => {
  db.getLikesByUser(req.params.userid).then(function(likes){
    res.send(likes);
  })
})

/*
  *********************************
  Gets the array of videos by userid
  *********************************
*/ 
app.post('/follow/:userid', (req, res) => {
  console.log('KATHRYN KATHRYN KATHRYN',req.session)
  console.log('HANSEN HANSEN HANSEN', req.params.userid)
  db.followSomeone(currentUser.id, req.params.userid).then(function(resp){
      res.status(200).send(console.log('server added following'))
    })
})

app.get('/followers/:myId', (req,res) => {
  db.findAllFollowers(req.params.myId)
    .then(function(allFollowers){
      console.log("BUDDY BUDDY", allFollowers)
      res.send({allFollowers: allFollowers});
    })

});

app.get('/follow/:userid', (req,res)=> {
  console.log('CURRENT USER CURRENT', currentUser)
  if(currentUser){
  db.areFollowing(currentUser.id, req.params.userid).then(function(result){
    res.send({result: result});
  })
}
})

app.delete('/follow/:userid', (req,res)=>{
  db.unfollow(currentUser.id, req.params.userid).then(function(resp){
    console.log(resp)
    res.status(200).send({resp: resp});
  })
})

app.get('/users/:userid/videos', (req, res) => {
  db.getVideosByUser(req.params.userid).then(function(videos){
    res.send(videos);
  })
})

/*
  ***********************************************************************
  Responds to requests to create time-based likes on user click.

  Validation implemented to prevent duplication.

  POST:
    Request object (from client):
      {
        start_time: like start time (in seconds from beginning of video),
        stop_time: like stop time (in seconds from beginning of video),
        user_id: current user id
        video_id: current video id
        channel_id: current channel id
      }

    Response object:
      {
        id: current time-based like id,
        start_time: like start time (in seconds from beginning of video),
        stop_time: like stop time (in seconds from beginning of video),
        video_id: current video id,
        channel_id: current channel id,
        users: array of user ids that have like this video
      }
  ***********************************************************************
*/

app.post('/likes/create', (req, res) => {
  db.createLike(req.body)
  .then(newLike => {
    res.send(newLike);
  });
});

/*
  ***********************************************************************
  Responds to requests to update time-based likes on user click.

  Validation implemented to prevent duplication.

  POST:
    Request object (from client):
      {
        user_id: current user id,
        like_id: current time-based like id
      }

    Response object:
      {
        id: current time-based like id,
        users: array containing all user ids that have liked (no repeats)
      }
  ***********************************************************************
*/

app.post('/likes/update', (req, res) => {
  db.updateLike(req.body)
  .then(newLike => {
    res.send(newLike);
  });
});

/*
  **************************************
  Gets the comments for a specific video
  **************************************
*/

app.get('/comments/get/:videoId', (req, res) => {
  console.log("Making DB call for: ", req.params.videoId);
  db.getCommentsByVideo(req.params.videoId)
  .then(comments => {
    res.send(comments);
  })
})

/*
  *****************
  Creates a comment
  *****************
*/

app.post('/comments/create', (req, res) => {
  db.createComment(req.body)
  .then(newComment => {
    res.send(newComment);
  })
})

/*
  ***********************************************************************
  Provides an endpoint to initialize the database with dummy information
  ***********************************************************************
*/

app.get('/db_init', (req, res) => {
  db.runInitDB()
  .then(message => {
    res.send(message);
  })
  .catch(err => {
    res.status(404).send(err);
  });
});

app.get('/allusers', (req, res) => {
  console.log('I GET HERE I HOPE')
  db.findAllUsers()
    .then(function(allUsers){
      console.log("ALL USERS", allUsers)
      res.send({allUsers: allUsers})
    })
    .catch(err => {
      console.log('GETTING ALL USERS FAILED IN SERVER')
    })
  // res.send("Test");
})

/*
  ***********************************************************************
  Responds to requests to add more videos to a channel.

  Utilizes the YouTube search api to obtain videos based upon a union of
  2 keywords from the searchCriteria object for the specified channel.

  Results are passed to the database where they are validated against the
  videos currently attached to the specified channel and added if not
  already present.

  GET:
    Response Object: array of new videos added to the channel:
    {
      id: new video id,
      url: new video YouTube id,
      channel_id: current channel id,
      time_based_likes: array of user likes
    }
  ***********************************************************************
*/
app.get('/videos/:id/likes', (req,res)=>{
  db.getTotalLikesByVideoId(req.params.id)
    .then(function(numOfLikes){
      // console.log('numOfLikes',numOfLikes);
      res.send({numOfLikes: numOfLikes});
    })
})

app.get('/videos/:id', (req, res) => {
  if (req.params.id === '1' || req.params.id === '2' || req.params.id === '3') {
    const randomCriteria = _.shuffle(searchCriteria[req.params.id]);
    const query = `extreme ${randomCriteria[0]} | ${randomCriteria[1]}) -fail -funny -3D`;
    const params = {
      q: query,
      order: 'viewCount',
      type: 'video',
      videoDefinition: 'high',
      videoDuration: 'medium',
      fields: 'items/id',
      videoDimension: '2d',
      videoEmbeddable: 'true',
      part: 'snippet',
    };

    youtube.search.list(params, (err, resp) => {
      if (err) {
        res.status(404).send('Search failed.  Youtube\'s fault');
      } else if (resp.items.length) {
        db.addVideos(resp.items, req.params.id)
        .then((videos) => {
          res.status(200).send(videos);
        });
      } else {
        res.status(404).send('Search failed to return any items');
      }
    });
  } else {
    res.status(400).send('Cannot add videos to that channel!');
  }
});

/*
  *******************************************************************
  Spin up server on either NODE environmental variable or 8000(local)
  *******************************************************************
*/

app.listen(serverUrl);
console.log(serverMessage);

