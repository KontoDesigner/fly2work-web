import { combineReducers } from 'redux'
import ajaxCallsInProgress from './ajaxStatusReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'
import geographyReducer from './geographyReducer'
import menuReducer from './menuReducer'
import newReducer from './newReducer'
import confirmedReducer from './confirmedReducer'
import overviewReducer from './overviewReducer'
import pendingBTTReducer from './pendingBTTReducer'
import submittedReducer from './submittedReducer'
import userReducer from './userReducer'
import pendingHRReducer from './pendingHRReducer'

export default combineReducers({
    ajaxCallsInProgress,
    toastr: toastrReducer,
    geography: geographyReducer,
    menu: menuReducer,
    new: newReducer,
    confirmed: confirmedReducer,
    overview: overviewReducer,
    pendingBTT: pendingBTTReducer,
    submitted: submittedReducer,
    user: userReducer,
    pendingHR: pendingHRReducer
})
