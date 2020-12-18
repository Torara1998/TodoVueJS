import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfigEnv = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MESSUREMENT_ID,
}

const firebaseConfig = process.env.VUE_APP_FIREBASE_CONFIG_FILE
  ? require(process.env.VUE_APP_FIREBASE_CONFIG_FILE)
  : firebaseConfigEnv

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth }
