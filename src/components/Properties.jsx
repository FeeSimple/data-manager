import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Media from 'react-media'
import PropertyDetails from './PropertyDetails'
import PropertyList from './PropertyList'
import CreateProperty from './CreateProperty'
import NoSelection from './NoSelection'
import {
  Button,
  Col,
  Row
} from 'reactstrap'

class Properties extends Component {
  render () {
    return (
      <div>
        <div className='clearfix'>
          <h1 className='float-left'>Properties</h1>
          <Button color='primary float-right' href='/properties/new'>New...</Button>
        </div>
        <hr />
        <Media query={{ maxWidth: 799 }}>
          {screenIsSmall => screenIsSmall
            ? (<Switch>
                <Route exact path='/properties/new' component={CreateProperty} />
                <Route exact path='/properties/' component={PropertyList} />
                <Route path='/properties/:id' component={PropertyDetails} />
              </Switch>)
            : (<Row >
                <Col md='4'>
                  <Route path='/properties/' component={PropertyList} />
                </Col>
                <Col>
                  <Switch>
                    <Route exact path='/properties/new' component={CreateProperty} />
                    <Route path='/properties/:id' component={PropertyDetails} />
                    <Route path='/properties/' component={NoSelection} />
                  </Switch>
                </Col>
              </Row>)
          }
        </Media>
      </div>
    )
  }
}

export default Properties
