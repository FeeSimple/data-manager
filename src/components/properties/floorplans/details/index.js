import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ecc from 'eosjs-ecc'

import { setFloorplan, setLoading, setOpResult } from '../../../../actions'
import FloorplanDetails from './FloorplanDetails'
import { FSMGRCONTRACT, FLOORPLANIMG } from '../../../../utils/consts'
import Alert from '../../../layout/Alert'

class FloorplanDetailsContainer extends Component {
  state = {
    floorplan: 'undefined',
    buffer: null,
    imagesToUpload: [],
    imgMultihashes: [],

    alertShow: false,
    alertContent: [],
    alertHeader: ''
  }

  onImagesUploaded = (err, resp) => {
    if (err) {
      console.error(err)
      return
    }
    const multihashes = resp.map(
      url => url.split('/')[url.split('/').length - 2]
    )

    const { imagesToUpload } = this.state
    const newImagesToUpload = [...imagesToUpload, ...multihashes]
    this.setState({ imagesToUpload: newImagesToUpload })
  }

  onImageDeleted = url => {
    const { imagesToUpload } = this.state
    const newImagesToUpload = [...imagesToUpload]
    newImagesToUpload.splice(imagesToUpload.indexOf(url), 1)

    this.setState({ imagesToUpload: newImagesToUpload })
  }

  handleToggleAlert = () => {
    const { alertShow } = this.state
    this.setState({ alertShow: !alertShow })
  }

  validator = floorplan => {
    let alertContent = []
    if (floorplan.name === '') {
      alertContent.push('Empty name')
    }

    if (floorplan.sq_ft_min < 0) {
      alertContent.push('Invalid Sq. Ft. Min')
    }

    if (floorplan.sq_ft_max <= 0) {
      alertContent.push('Invalid Sq. Ft. Max')
    }

    if (floorplan.sq_ft_max < floorplan.sq_ft_min) {
      alertContent.push('Sq. Ft. Max < Sq. Ft. Min')
    }

    if (floorplan.rent_min < 0) {
      alertContent.push('Invalid Rent Min')
    }

    if (floorplan.rent_max <= 0) {
      alertContent.push('Invalid Rent Max')
    }

    if (floorplan.rent_max < floorplan.rent_min) {
      alertContent.push('Rent Max < Rent Min')
    }

    return alertContent
  }

  save = async e => {
    e.preventDefault()

    const propertyId = this.props.match.params.id
    const { floorplan, imagesToUpload } = this.state
    const {
      contracts,
      accountData,
      setLoading,
      setOpResult,
      setFloorplan,
      history
    } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(floorplan)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Floorplan editing with invalid input',
        alertContent: result
      })
      return
    }

    setLoading(true)

    let operationOK = true

    try {
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
    } catch (err) {
      operationOK = false
    }

    if (imagesToUpload.length > 0) {
      // Mapping values to object keys removes duplicates.
      const imagesObj = {}
      imagesToUpload.forEach(multihash => {
        imagesObj[multihash] = multihash
      })

      await Promise.all(
        Object.keys(imagesObj).map(multihash => {
          return fsmgrcontract.addflplanimg(
            accountData.active,
            floorplan.id,
            ecc.sha256(multihash),
            multihash,
            options
          )
        })
      )
    }

    history.push(`/${propertyId}`)

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to edit Floorplan "${floorplan.name}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Floorplan "${floorplan.name}" edited successfully`,
        type: 'success',
      })
    }

    setLoading(false)
  }

  create = async e => {
    e.preventDefault()

    const { contracts, accountData, setLoading, history, setOpResult } = this.props
    const propertyId = this.props.match.params.id
    const { floorplan } = this.state
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(floorplan)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Floorplan creation with invalid input',
        alertContent: result
      })
      return
    }

    setLoading(true)

    let operationOK = true

    try {
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
      history.push(`/${propertyId}`)
    } catch (err) {
      operationOK = false
    }

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to create new Floorplan "${floorplan.name}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `New Floorplan "${floorplan.name}" created successfully`,
        type: 'success',
      })
    }

    setLoading(false)
    
  }

  handleChange (event) {
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

  async componentDidMount () {
    const { eosClient, accountData } = this.props
    const propertyId = this.props.match.params.id

    if (propertyId !== 'new') {
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        FLOORPLANIMG
      )

      const imgMultihashes = rows
        .filter(row => row.floorplan_id === Number(propertyId))
        .map(row => row.ipfs_address)

      this.setState({ imgMultihashes })
    }

    const { isCreating, properties } = this.props
    const { id, floorplanId } = this.props.match.params
    const { floorplans } = properties[id]

    // Edit an existing floorplan
    if (!isCreating) {
      let existingFloorplan = floorplans[floorplanId]
      this.setState({
        floorplan: existingFloorplan
      })
    } else {
      // Create a new floorplan
      this.setState({
        floorplan: newFloorplan()
      })
    }
  }

  render () {
    const { isCreating } = this.props
    const { id } = this.props.match.params
    const { imgMultihashes } = this.state

    const galleryItems = imgMultihashes.map(multihash => ({
      original: `https://gateway.ipfs.io/ipfs/${multihash}/`,
      thumbnail: `https://gateway.ipfs.io/ipfs/${multihash}/`
    }))

    return (
      <div>
        <FloorplanDetails
          floorplan={this.state.floorplan}
          propertyId={id}
          isCreating={isCreating}
          onSaveClick={this.save}
          onCreateClick={this.create}
          onCancelClick={this.cancel}
          onChange={e => this.handleChange(e)}
          onImagesUploaded={this.onImagesUploaded}
          onImageDeleted={this.onImageDeleted}
          galleryItems={galleryItems}
        />
        <Alert
          isOpen={this.state.alertShow}
          handleToggle={this.handleToggleAlert}
          alertHeader={this.state.alertHeader}
          alertContent={this.state.alertContent}
        />
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

function mapStateToProps ({
  eosClient,
  scatter,
  contracts,
  accountData,
  properties
}) {
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(
  connect(mapStateToProps, { setFloorplan, setLoading, setOpResult })(
    FloorplanDetailsContainer
  )
)
