import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setEosClient, addProperties, setScatter, setFsMgrContract, setNetwork } from './actions'
import Eos from 'eosjs'
import { PROPERTY } from './utils/tables'
import getScatter from './utils/getScatter'
import { getAccountFrom } from './utils'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import logger from 'redux-logger'
// import { applyMiddleware, compose } from 'redux'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  // composeEnhancers(
  //   applyMiddleware(logger)
  // )
)

getScatter.then(async (results) => {
  const { scatter, network } = results
  
  const eosClient = scatter.eos(network, Eos, {}, 'https')
  store.dispatch(setScatter(scatter))
  store.dispatch(setNetwork(network))
  store.dispatch(setEosClient(eosClient))

  const account = await getAccountFrom(scatter, network)

  const { rows } = await eosClient.getTableRows(
    true,
    'fsmgrcode111',
    account.name,
    PROPERTY
  )
  store.dispatch(addProperties(rows))
  const contract = await eosClient.contract('fsmgrcode111')
  store.dispatch(setFsMgrContract(contract))
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
