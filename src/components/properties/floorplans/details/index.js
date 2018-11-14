import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setFloorplan, setLoading } from '../../../../actions'
import FloorplanDetails, { READING, EDITING, CREATING } from './FloorplanDetails'
import { FSMGRCONTRACT } from '../../../../utils/consts'
import ipfs from '../../../../ipfs'


class FloorplanDetailsContainer extends Component {
  state = {
    mode: READING,
    prevFloorplan: {},
    floorplan: newFloorplan(),
    buffer: null,
    ipfsHash: null
  }

  onImageDrop = (files) => {
    console.info('user selected a file to upload')
    const file = files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
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

    const { buffer } = this.state

    try {
      const result = await ipfs.files.add(buffer) 
      this.setState({ ipfsHash: result[0].hash })
      const res = await ipfs.files.cat(result[0].hash)
      this.setState({ buffer: "data:image/png;base64," + Buffer(res).toString('base64') })
    } catch (err) { 
      console.error(err) 
      return
    }    

    const propertyId = this.props.match.params.id
    const { floorplan } = this.state
    const { contracts, accountData, setLoading, setFloorplan } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)
    await fsmgrcontract.modfloorplan(
      accountData.active,
      floorplan.id,
      propertyId,
      floorplan.name,
      floorplan.bedrooms,
      floorplan.bathrooms,
      floorplan.sq_ft_min,
      floorplan.sq_ft_max,
      floorplan.rent_min,
      floorplan.rent_max,
      floorplan.deposit,
      options
    )

    setFloorplan(propertyId, floorplan)
    setLoading(false)
  }

  create = async (e) => {
    e.preventDefault()

    const { contracts, accountData, setLoading, history } = this.props
    const propertyId = this.props.match.params.id
    const { floorplan } = this.state
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }
    this.setState({ mode: READING })

    setLoading(true)

    await fsmgrcontract.addfloorplan(
      accountData.active,
      propertyId,
      floorplan.name,
      floorplan.bedrooms,
      floorplan.bathrooms,
      floorplan.sq_ft_min,
      floorplan.sq_ft_max,
      floorplan.rent_min,
      floorplan.rent_max,
      floorplan.deposit,
      options
    )

    setFloorplan(propertyId, floorplan)
    setLoading(false)
    history.push(`/${propertyId}`)
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
    const { isCreating, properties } = this.props
    const { id, floorplanId } = this.props.match.params
    const { floorplans } = properties[id]

    const mode = isCreating ? CREATING : this.state.mode
    let floorplan = mode === EDITING || mode === CREATING  ? this.state.floorplan : floorplans[floorplanId]
    return (
      <div>
        {typeof floorplan === 'undefined' && <h1 className="text-center my-5 py-5">404 - Floorplan not found</h1>}
        {typeof floorplan !== 'undefined' &&
          <FloorplanDetails
            floorplan={floorplan}
            mode={mode}
            onEditClick={this.edit}
            onSaveClick={this.save}
            onCreateClick={this.create}
            onCancelClick={this.cancel}
            onChange={(e) => this.handleChange(e)}
            onImageDrop={this.onImageDrop}
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

function mapStateToProps({ eosClient, scatter, contracts, accountData, properties }){
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(connect(
  mapStateToProps,
  { setFloorplan, setLoading }
)(FloorplanDetailsContainer))