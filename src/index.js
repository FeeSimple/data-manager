import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setEosClient, setScatter } from './actions'
import Eos from 'eosjs'
import getScatter from './utils/getScatter'
import { getFallbackEos } from './utils'
import './css/style.css'
import './css/main.css'

// import logger from 'redux-logger'
// import { applyMiddleware, compose } from 'redux'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer
  // composeEnhancers(
  //   applyMiddleware(logger)
  // )
)

// Fallback eosjs
const eos = getFallbackEos(Eos)
store.dispatch(setEosClient({ ...eos, locked: true }))

getScatter
  .then(async results => {
    const { scatter } = results
    store.dispatch(setScatter(scatter))
  })
  .catch(error => {
    console.error('Error setting up scatter.', error)
  })

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Provider store={store}>
        <Root />
      </Provider>
    </BrowserRouter>
    <script src='js/vendor/jquery-3.3.1.min.js' />
    <script src='js/plugins/bootstrap.min.js' />
    <script src='js/plugins/popper.min.js' />
    <script src='js/main.js' />
  </div>,
  document.getElementById('root')
)
