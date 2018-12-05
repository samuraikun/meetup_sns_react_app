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
  exports.userFollowing = require('./userFollowing').userFollowing;
}
