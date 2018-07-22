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
import Eos from 'eosjs'
import { PROPERTY } from './utils/tables'
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

getScatter.then( async (results) => {
  const { scatter, network } = results
  const eosClient = scatter.eos(network, Eos, {}, 'http')

  store.dispatch(setScatter(scatter))
  store.dispatch(setEosClient(eosClient))
  
  console.info('eosClient app:',eosClient)
  const contract = await eosClient.contract(process.env.REACT_APP_FSMGR_ACC_NAME)
  const { rows } = await eosClient.getTableRows(
    true,
    process.env.REACT_APP_FSMGR_ACC_NAME,
    process.env.REACT_APP_FSMGR_ACC_NAME,
    PROPERTY
  )
  store.dispatch(addProperties(rows))
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
