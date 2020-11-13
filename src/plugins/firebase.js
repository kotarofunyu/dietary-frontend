import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAI,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STRAGE_BUCKET,
  messagingSenderId: process.env.MESSAGEING_SENDER_ID,
  appId: process.env.APP_ID
}

firebase.initializeApp(firebaseConfig)

export default firebase
