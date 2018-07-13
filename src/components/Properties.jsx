import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Media from 'react-media'
import PropertyDetails from './PropertyDetails'
import PropertyList from './PropertyList'
import NoSelection from './NoSelection'
import {
  Button,
  Col,
  Row
} from 'reactstrap'

export default function Properties () {
  return (
    <div>
      <div className='clearfix'>
        <h1 className='float-left'>Properties</h1>
        <Button color='primary float-right' tag={Link} to='/new'>New...</Button>
      </div>
      <hr />
      <Media query={{ maxWidth: 799 }}>
        {screenIsSmall => screenIsSmall
          ? (
            <Switch>
              <Route exact path='/new'>
                <PropertyDetails isCreating />
              </Route>
              <Route 
                exact 
                path='/:id' 
                render={({match}) => (
                  <PropertyDetails id={match.params.id}/>
              )}/>
              <Route exact path='/' component={PropertyList} />
            </Switch>)
          : (
            <Row >
              <Col md='4'>
                <Route path='/' component={PropertyList} />
              </Col>
              <Col>
                <Switch>
                  <Route exact path='/new'>
                    <PropertyDetails isCreating />
                  </Route>
                  <Route 
                    exact 
                    path='/:id' 
                    render={({match}) => (
                      <PropertyDetails id={match.params.id}/>
                  )}/>
                  <Route exact path='/' component={NoSelection} />
                </Switch>
              </Col>
            </Row>)
        }
      </Media>
    </div>
  )
}
