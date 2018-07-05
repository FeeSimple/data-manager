import React from 'react'
import { Container } from 'reactstrap'
import Properties from './Properties'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { setScatter, setIdentity } from '../actions'
import getScatter from '../utils/getScatter'

class AppContainer extends React.Component{
  
  componentWillMount () {    

    getScatter.then((results) => {
      const { scatter } = results
      setScatter(scatter)
      setIdentity(scatter.identity)      
    }).catch((error) => {
      console.error('Error setting up scatter.', error)
    })
  }

  render(){
    return App()
  }
}


const App = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Properties />
      </Container>
    </div>
  )
}

function mapStateToProps ({ scatter, identity }) {
  return { scatter, identity }
}

export default connect(
  mapStateToProps,
  { setScatter, setIdentity }
)(AppContainer)