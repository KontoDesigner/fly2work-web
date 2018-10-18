import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import RootReducer from '../reducers/rootReducer'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

var logger = createLogger({
    collapsed: true
})

const middleware =
    process.env.NODE_ENV !== 'production'
        ? //Dev
          [reduxImmutableStateInvariant(), thunk, logger]
        : //Production
          [thunk]

const Store = createStore(RootReducer, applyMiddleware(...middleware))

export default Store
