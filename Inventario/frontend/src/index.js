import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import App from './main/app'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './main/reducers'
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6InZpbmljaXVzIiwiZW1haWwiOiJ2YmFzdGF6aW5AZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU3NzcwNjgxMiwiZXhwIjoxNTc3OTY2MDEyfQ.6Cji4LgLfFTfxAocjOqOLzK31N5d6iY57rOCm-LLeZc'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('app'))

serviceWorker.unregister();
