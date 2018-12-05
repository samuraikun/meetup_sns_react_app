/*
* Triggers when a user create new event.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'createActivity') {
  exports.createActivity = require('./eventActivity').createActivity;
}

/*
* Triggers when a user cancel event.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'cancelActivity') {
  exports.cancelActivity = require('./eventActivity').cancelActivity;
}

/*
* Triggers when a user followed other user.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'userFollowing') {
  exports.userFollowing = require('./userFollow').userFollowing;
}

/*
* Triggers when a user unfollow following user.
*/
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'userUnfollow') {
  exports.userUnfollow = require('./userFollow').userUnfollow;
}
