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

class AppContainer extends Component {
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
          path='/:id/edit'
          render={({ match }) => <PropertyDetails id={match.params.id} />}
        />
        <Route exact path='/:id/floorplan/new'>
          <FloorplanDetails isCreating />
        </Route>
        <Route exact path='/:id/unit/new'>
          <UnitDetails isCreating />
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
          path='/:id/unit/:unitId'
          render={({ match }) => (
            <UnitDetails id={match.params.unitId} />
          )}
        />
      </Switch>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(AppContainer))
