import { applyMiddleware, compose, createStore, combineReducers  } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './notificationReducer'
import postReducer from './postReducer'

let rootReducers = combineReducers({
  posts: postReducer,
  notifications: notificationReducer
});

let finalCreateStore = compose(
    applyMiddleware(thunk)
)(createStore)

let store = finalCreateStore(rootReducers);

export default store;
