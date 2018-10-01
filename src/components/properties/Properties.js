import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Media from 'react-media'
import PropertyDetailsContainer from './PropertyDetailsContainer'
import PropertyList from './PropertyList'
import NoSelection from '../NoSelection'
import IconAdd from '../../img/icon-add.svg'
import {
  Col,
  Row,
  Container
} from 'reactstrap'

export default function Properties () {
  return (
    <div>
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="float-left">Properties</h3>
              <h3 className="float-right">
                <Link to='/new'>
                  <img src={IconAdd} alt=""/>
                  <span className="hide-xs">
                    New Property
                  </span>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Container className='my-5'>
        <Media query={{ maxWidth: 799 }}>
          {screenIsSmall => screenIsSmall
            ? (
              <Switch>
                <Route exact path='/new'>
                  <PropertyDetailsContainer isCreating />
                </Route>
                <Route
                  exact
                  path='/:id'
                  render={({match}) => (
                    <PropertyDetailsContainer id={match.params.id} />
                  )} />
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
                      <PropertyDetailsContainer isCreating />
                    </Route>
                    <Route
                      exact
                      path='/:id'
                      render={({match}) => (
                        <PropertyDetailsContainer id={match.params.id} />
                      )} />
                    <Route exact path='/' component={NoSelection} />
                  </Switch>
                </Col>
              </Row>)
          }
        </Media>
      </Container>
    </div>
  )
}
