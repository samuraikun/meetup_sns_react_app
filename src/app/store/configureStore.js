import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import firebase from '../config/firebase'

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  // README ログイン時に Firestore に保存するフィールド構造を自前で作成するために設定をOFFにする
  // true の場合、Authentication のレスポンスを元に自動的にフィールドが決まった Userドキュメントを Firestore に作成する
  updateProfileOnLogin: false
}

export const configureStore = (preloadedState) => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancers = [middlewareEnhancer]

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  )

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer.js', () => {
        const newRootReducer = require('../reducers/rootReducer').default
        store.replaceReducer(newRootReducer)
      })
    }
  }

  return store
}