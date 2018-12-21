import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ecc from 'eosjs-ecc'

import { setFloorplan, setLoading } from '../../../../actions'
import FloorplanDetails, { READING, EDITING, CREATING } from './FloorplanDetails'
import { FSMGRCONTRACT, FLOORPLANIMG } from '../../../../utils/consts'

class FloorplanDetailsContainer extends Component {
  state = {
    mode: READING,
    prevFloorplan: {},

    floorplan: newFloorplan(),
    buffer: null,
    imagesToUpload: [],
    imgMultihashes: []
  }

  onImagesUploaded = (err, resp) => {
    if (err) {
      console.error(err)
      return
    }
    const multihashes = resp.map(url => url.split('/')[url.split('/').length - 2])

    const { imagesToUpload } = this.state
    const newImagesToUpload = [
      ...imagesToUpload,
      ...multihashes
    ]
    this.setState({ imagesToUpload: newImagesToUpload })
  }

  onImageDeleted = url => {
    const { imagesToUpload } = this.state
    const newImagesToUpload = [...imagesToUpload]
    newImagesToUpload.splice(imagesToUpload.indexOf(url), 1)

    this.setState({ imagesToUpload: newImagesToUpload })
  }

  edit = (e, floorplan) => {
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

    const propertyId = this.props.match.params.id
    const { floorplan, imagesToUpload } = this.state
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

    if (imagesToUpload.length > 0) {
      // Mapping values to object keys removes duplicates.
      const imagesObj = {}
      imagesToUpload.map(multihash => {
        imagesObj[multihash] = multihash
        return multihash
      })

      await Promise.all(Object.keys(imagesObj).map(async multihash => {
        fsmgrcontract.addflplanimg(
          accountData.active,
          floorplan.id,
          ecc.sha256(multihash),
          multihash,
          options
        )
      }))
    }

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

  async componentDidMount() {
    const { eosClient, accountData } = this.props

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      FLOORPLANIMG
    )

    const imgMultihashes = rows.map(row => row.ipfs_address)
    this.setState({ imgMultihashes })
  }

  render() {
    const { isCreating, properties } = this.props
    const { id, floorplanId } = this.props.match.params
    const { floorplans } = properties[id]
    const { imgMultihashes } = this.state

    const galleryItems = imgMultihashes.map(multihash => ({
      original: `https://gateway.ipfs.io/ipfs/${multihash}/`,
      thumbnail: `https://gateway.ipfs.io/ipfs/${multihash}/`
    }))

    const mode = isCreating ? CREATING : this.state.mode
    let floorplan = mode === EDITING || mode === CREATING ? this.state.floorplan : floorplans[floorplanId]
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
            onImagesUploaded={this.onImagesUploaded}
            onImageDeleted={this.onImageDeleted}
            galleryItems={galleryItems}
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

function mapStateToProps({ eosClient, scatter, contracts, accountData, properties }) {
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(connect(
  mapStateToProps,
  { setFloorplan, setLoading }
)(FloorplanDetailsContainer))