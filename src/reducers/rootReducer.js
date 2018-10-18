import { combineReducers } from 'redux'
import ajaxCallsInProgress from './ajaxStatusReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'
import newReducer from './newReducer'
import geographyReducer from './geographyReducer'
import menuReducer from './menuReducer'

export default combineReducers({
    ajaxCallsInProgress,
    toastr: toastrReducer,
    new: newReducer,
    geography: geographyReducer,
    menu: menuReducer
})
