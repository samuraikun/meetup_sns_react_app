const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://meetup-sns-react-app.firebaseio.com"
  });

  admin.firestore().settings({timestampsInSnapshots: true});
} catch (error) {
  console.log(error);
}

exports.userFollowing = functions.firestore.document('users/{followerUid}/following/{followingUid}').onCreate(async (event, context) => {
  const followerUid = context.params.followerUid;
  const followingUid = context.params.followingUid;

  const followerDocRef = admin.firestore().collection('users').doc(followerUid);
  console.log(followerDocRef);

  try {
    const followerDoc = await followerDocRef.get();
    let userData = followerDoc.data();
    console.log({ userData });
    let follower = {
      displayName: userData.displayName,
      photoURL: userData.photoURL || '/assets/user.png',
      city: userData.city || 'unknown city'
    }

    return admin.firestore().collection('users').doc(followingUid).collection('followers').doc(followerUid).set(follower);
  } catch (error) {
    return console.log(error);
  }
});
