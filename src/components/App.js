import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import GridContainer from './properties/grid'
import PropertyDetails from './properties/details'
import User from './user'
import Floorplans from './properties/floorplans'
import FloorplanDetails from './properties/floorplans/details'
import Unit from './properties/units'
import UnitDetails from './properties/units/details'
import TermPrice from './properties/termprices'
import TermPriceDetails from './properties/termprices/details'
import { getImportedKeyEos } from '../utils/index'
import Eos from 'eosjs'
import { FSMGRCONTRACT } from '../utils/consts'
import getScatterAsync from '../utils/getScatterAsync'
import { setFsMgrContract, setEosClient, setOpResult, setScatter } from '../actions/index'

class AppContainer extends Component {
  async componentDidMount () {
    const {
      eosClient,
      accountData,
      setEosClient,
      setScatter,
      setFsMgrContract,
      setOpResult,
      contracts
    } = this.props

    let eosClientNew = null

    // Token to realize re-render after page refresh or page close/re-open
    if (eosClient.locked) {
      const fsmgrcontract = contracts[FSMGRCONTRACT]
      if (accountData.info.usingScatter) {
        let {scatter, eos} = await getScatterAsync()
        if (!scatter) {
          setOpResult({
            show: true,
            title: 'Scatter Desktop not available',
            text: 'Please run Scatter Desktop',
            type: 'error'
          })
          return
        }
        setScatter(scatter)
        eosClientNew = eos
        console.log('AppContainer - usingScatter')
      } else {
        if (
          accountData &&
          accountData.active &&
          accountData.info &&
          !fsmgrcontract.transaction
        ) {
          let privKey = accountData.info.privKey
          eosClientNew = getImportedKeyEos(Eos, privKey)
          console.log('AppContainer - using privkey')
        }
      }

      if (eosClientNew) {
        setEosClient(eosClientNew)
        setFsMgrContract(await eosClientNew.contract(FSMGRCONTRACT))
        setOpResult({
          show: false,
          title: '',
          text: '',
          type: 'error'
        })
      }
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path='/'>
          <GridContainer />
        </Route>
        <Route exact path='/new'>
          <PropertyDetails isCreating />
        </Route>
        <Route exact path='/user'>
          <User />
        </Route>
        <Route
          exact
          path='/:id'
          render={({ match }) => <Floorplans id={match.params.id} />}
        />
        <Route
          exact
          path='/:id/unit'
          render={({ match }) => <Unit id={match.params.id} />}
        />
        <Route
          exact
          path='/:id/unit/:unitid/termprice'
          render={({ match }) => <TermPrice id={match.params.id} />}
        />
        <Route
          exact
          path='/:id/edit'
          render={({ match }) => <PropertyDetails id={match.params.id} />}
        />
        <Route exact path='/:id/floorplan/new'>
          <FloorplanDetails isCreating />
        </Route>
        <Route exact path='/:id/unit/new'>
          <UnitDetails isCreating />
        </Route>
        <Route exact path='/:id/unit/:unitid/termprice/new'>
          <TermPriceDetails isCreating />
        </Route>
        <Route
          exact
          path='/:id/floorplan/:floorplanId'
          render={({ match }) => (
            <FloorplanDetails id={match.params.floorplanId} />
          )}
        />
        <Route
          exact
          path='/:id/unit/:unitid'
          render={({ match }) => <UnitDetails id={match.params.unitid} />}
        />
        <Route
          exact
          path='/:id/unit/:unitid/termprice/:termid'
          render={({ match }) => <TermPriceDetails id={match.params.id} />}
        />
      </Switch>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient, accountData, contracts }) {
  return { isLoading, eosClient, accountData, contracts }
}

export default withRouter(
  connect(mapStateToProps, {
    setFsMgrContract,
    setEosClient,
    setOpResult,
    setScatter
  })(AppContainer)
)
