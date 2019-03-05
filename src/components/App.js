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
import { setFsMgrContract, setEosClient, setOpResult } from '../actions/index'

class AppContainer extends Component {
  async componentDidMount () {
    const {
      eosClient,
      accountData,
      setEosClient,
      setFsMgrContract,
      setOpResult,
      contracts
    } = this.props

    // Token to realize re-render after page refresh or page close/re-open
    if (eosClient.locked) {
      const fsmgrcontract = contracts[FSMGRCONTRACT]

      if (
        accountData &&
        accountData.active &&
        accountData.info &&
        !fsmgrcontract.transaction
      ) {
        let privKey = accountData.info.privKey
        let eosClient = getImportedKeyEos(Eos, privKey)
        setEosClient(eosClient)
        setFsMgrContract(await eosClient.contract(FSMGRCONTRACT))
        setOpResult({
          show: false,
          title: '',
          text: '',
          type: 'error'
        })
        console.log(
          'AppContainer componentDidMount - setEosClient and setFsMgrContract'
        )
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
    setOpResult
  })(AppContainer)
)
