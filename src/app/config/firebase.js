import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB1lLxE5ijPTf4FL9sb3rHwJljl31jFknM",
  authDomain: "meetup-sns-react-app.firebaseapp.com",
  databaseURL: "https://meetup-sns-react-app.firebaseio.com",
  projectId: "meetup-sns-react-app",
  storageBucket: "meetup-sns-react-app.appspot.com",
  messagingSenderId: "841591398152"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
