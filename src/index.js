import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { setEosClient, addProperties, setScatter } from './actions'
import EOSClient from './utils/eos-client'
import getScatter from './utils/getScatter'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
require('dotenv').config()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
)

const eosClient = new EOSClient(process.env.REACT_APP_FSMGR_ACC_NAME, process.env.REACT_APP_FSMGR_ACC_NAME)
store.dispatch(setEosClient(eosClient))
eosClient
  .getTableRows('property')
  .then(data => {
    store.dispatch(addProperties(data.rows))
  })
  .catch(e => {
    console.error(e)
  })

getScatter.then((results) => {
  const { scatter } = results
  store.dispatch(setScatter(scatter))
}).catch((error) => {
  console.error('Error setting up scatter.', error)
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
