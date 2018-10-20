import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setFloorplan, setLoading } from '../../../../actions'
import FloorplanDetails, { READING, EDITING, CREATING } from './FloorplanDetails'


class FloorplanDetailsContainer extends Component {
  state = {
    mode: READING,
    prevFloorplan: {},
    floorplan: newFloorplan()
  }

  edit = (e,floorplan) => {
    e.preventDefault()

    this.setState({
      mode: EDITING,
      floorplan,
      prevFloorplan: {
        ...floorplan
      }
    })
  }

  save = async (e) => {
    e.preventDefault()
    console.info('save clicked')
  }

  create = async (e) => {
    e.preventDefault()
    console.info('create clicked')

  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState(prevState => {
      let state = {
        ...prevState
      }
      state.floorplan = {
        ...prevState.floorplan,
        [name]: value
      }
      return state
    })
  }

  render() {
    const { isCreating, floorplans, id } = this.props
    const mode = isCreating ? CREATING : this.state.mode
    let floorplan = mode === EDITING || mode === CREATING  ? this.state.floorplan : floorplans[id]
    return (
      <div>
        {typeof floorplan === 'undefined' && <h1 className="text-center my-5 py-5">404 - Floorplan not found</h1>}
        {isCreating
          ? typeof floorplan !== 'undefined' &&
            <FloorplanDetails
              floorplan={floorplan}
              mode={mode}
              onEditClick={this.edit}
              onSaveClick={this.save}
              onCreateClick={this.create}
              onCancelClick={this.cancel}
              onChange={(e) => this.handleChange(e)}
            />
          : typeof floorplan !== 'undefined' &&
            <FloorplanDetails
              floorplan={floorplan}
              mode={mode}
              onEditClick={this.edit}
              onSaveClick={this.save}
              onCreateClick={this.create}
              onCancelClick={this.cancel}
              onChange={(e) => this.handleChange(e)}
            />
        }
      </div>
    )
  }
}

const newFloorplan = () => ({
  name: '',
  bedrooms: 0,
  bathrooms: 0,
  sq_ft_min: 0,
  sq_ft_max: 0,
  rent_min: 0,
  rent_max: 0,
  deposit: 0
})

function mapStateToProps({ floorplans, eosClient, scatter, contracts, accountData }){
  return { floorplans, eosClient, scatter, contracts, accountData }
}

export default withRouter(connect(
  mapStateToProps,
  { setFloorplan, setLoading }
)(FloorplanDetailsContainer))