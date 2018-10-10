import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import GridContainer from './properties/grid'
import PropertyDetails from './properties/details'
import Floorplans from './properties/floorplans'

class AppContainer extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/'>
          <GridContainer />
        </Route>
        <Route exact path='/new'>
          <PropertyDetails isCreating/>
        </Route>
        <Route
          exact
          path='/:id'
          render={({match}) => (
            <Floorplans id={match.params.id} />
          )}
        />
        <Route
          exact
          path='/:id/edit'
          render={({match}) => (
            <PropertyDetails id={match.params.id} />
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
