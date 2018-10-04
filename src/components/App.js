import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import PropertiesContainer from './properties'

class AppContainer extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/'>
          <PropertiesContainer />
        </Route>
      </Switch>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(AppContainer))
