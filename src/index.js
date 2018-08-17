import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { setEosClient, addProperties, setScatter, setFsMgrContract, setNetwork } from './actions'
import Eos from 'eosjs'
import { PROPERTY } from './utils/tables'
import getScatter from './utils/getScatter'
import { getAccountFrom, getFallbackEos } from './utils'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
)

getScatter.then(async (results) => {
  const { scatter, network } = results
  const eosClient = scatter.eos(network, Eos, {}, 'http')
  store.dispatch(setScatter(scatter))
  store.dispatch(setNetwork(network))
  store.dispatch(setEosClient(eosClient))

  const account = await getAccountFrom(scatter, network)

  const { rows } = await eosClient.getTableRows(
    true,
    process.env.REACT_APP_FSMGR_ACC_NAME,
    account.name,
    PROPERTY
  )
  store.dispatch(addProperties(rows))
  const contract = await eosClient.contract(process.env.REACT_APP_FSMGR_ACC_NAME)
  store.dispatch(setFsMgrContract(contract))
}).catch((error) => {
  console.error('Error setting up scatter.', error)
})

// Fallback eosjs
const eos = getFallbackEos(Eos)
store.dispatch(setEosClient(eos))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
