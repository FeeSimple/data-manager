import React from 'react'
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

export default function Properties () {
  return (
    <div>
      <div className='clearfix'>
        <h1 className='float-left'>Properties</h1>
        <Button color='primary float-right' href='/new'>New...</Button>
      </div>
      <hr />
      <Media query={{ maxWidth: 799 }}>
        {screenIsSmall => screenIsSmall
          ? (<Switch>
              <Route exact path='/new' component={CreateProperty} />
              <Route exact path='/' component={PropertyList} />
              <Route path='/:id' component={PropertyDetails} />
            </Switch>)
          : (<Row >
              <Col md='4'>
                <Route path='/' component={PropertyList} />
              </Col>
              <Col>
                <Switch>
                  <Route exact path='/new'>
                    <PropertyDetails isCreating={true}/>
                  </Route>
                  <Route path='/:id' component={PropertyDetails} />
                  <Route path='/' component={NoSelection} />
                </Switch>
              </Col>
            </Row>)
        }
      </Media>
    </div>
  )
}
