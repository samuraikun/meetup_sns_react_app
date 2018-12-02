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

const newActivity = (type, event, id) => {
  return {
    type: type,
    eventDate: event.date,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: event.hostUid,
    eventId: id
  }
}

exports.createActivity = functions.firestore.document('events/{eventId}').onCreate(async event => {
  let newEvent = event.data();

  console.log(newEvent);

  const activity = newActivity('newEvent', newEvent, event.id);

  console.log(activity);

  try {
    const activityRef = await admin.firestore().collection('activity').add(activity);
    console.log('Activity created: ', activityRef);
    console.log('Activity created with ID: ', activityRef.id);
  } catch (error) {
    console.log('Error adding activity', error);
  }
});

exports.cancelActivity = functions.firestore.document('events/{eventId}').onUpdate(async (event, context) => {
  let updatedEvent = event.after.data();
  let previousEventData = event.before.data();

  console.log({event});
  console.log({context});
  console.log({updatedEvent});
  console.log({previousEventData});

  if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) return false;

  const activity = newActivity('cancelledEvent', updatedEvent, context.params.eventId);

  console.log({activity});

  try {
    const activityRef = await admin.firestore().collection('activity').add(activity);
    console.log('Activity created: ', activityRef);

    return console.log('Activity created with ID: ', activityRef.id);
  } catch (error) {
    return console.log('Error adding activity', error);
  }
});
