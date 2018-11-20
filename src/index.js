import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './infrastructure/store'
import { runWithAdal } from 'react-adal'
import { authContext } from './infrastructure/adalConfig'

runWithAdal(authContext, () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
})
