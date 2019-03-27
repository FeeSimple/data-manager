import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ecc from 'eosjs-ecc'

import {
  setUnit,
  setLoading,
  setErrMsg,
  setOpResult
} from '../../../../actions'
import UnitDetails from './UnitDetails'
import { FSMGRCONTRACT, UNITIMG } from '../../../../utils/consts'
import Alert from '../../../layout/Alert'

class UnitDetailsContainer extends Component {
  state = {
    prevUnit: {},
    unit: 'undefined',
    isLeased: true,
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

  validator = unit => {
    let alertContent = []
    if (unit.name === '') {
      alertContent.push('Empty name')
    }

    if (unit.sq_ft_min < 0) {
      alertContent.push('Invalid Sq. Ft. Min')
    }

    if (unit.sq_ft_max <= 0) {
      alertContent.push('Invalid Sq. Ft. Max')
    }

    if (unit.sq_ft_max < unit.sq_ft_min) {
      alertContent.push('Sq. Ft. Max < Sq. Ft. Min')
    }

    if (unit.rent_min < 0) {
      alertContent.push('Invalid Rent Min')
    }

    if (unit.rent_max <= 0) {
      alertContent.push('Invalid Rent Max')
    }

    if (unit.rent_max < unit.rent_min) {
      alertContent.push('Rent Max < Rent Min')
    }

    let dateAvailable = new Date(unit.date_available).getTime()
    let currentDate = new Date().getTime()
    if (dateAvailable < currentDate) {
      alertContent.push('Date available in the past')
    }

    return alertContent
  }

  save = async e => {
    e.preventDefault()

    const propertyId = this.props.match.params.id
    const { unit, imagesToUpload } = this.state
    const {
      contracts,
      accountData,
      setLoading,
      setOpResult,
      setUnit,
      history
    } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(unit)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Unit editing with invalid input',
        alertContent: result
      })
      return
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.modunit(
        accountData.active,
        unit.id,
        propertyId,
        unit.name,
        unit.bedrooms,
        unit.bathrooms,
        unit.sq_ft_min,
        unit.sq_ft_max,
        unit.rent_min,
        unit.rent_max,
        unit.status,
        new Date(unit.date_available).getTime(),
        options
      )

      setUnit(propertyId, unit)
    } catch (err) {
      operationOK = false
    }

    if (imagesToUpload.length > 0) {
      // Mapping values to object keys removes duplicates.
      const imagesObj = {}
      imagesToUpload.map(multihash => {
        imagesObj[multihash] = multihash
        return multihash
      })

      await Promise.all(
        Object.keys(imagesObj).map(async multihash => {
          fsmgrcontract.addflplanimg(
            accountData.active,
            unit.id,
            ecc.sha256(multihash),
            multihash,
            options
          )
        })
      )
    }

    history.push(`/${propertyId}/unit`)

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to edit Unit "${unit.name}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Unit "${unit.name}" edited successfully`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  create = async e => {
    e.preventDefault()

    const {
      contracts,
      accountData,
      setLoading,
      setOpResult,
      history
    } = this.props
    const propertyId = this.props.match.params.id
    const { unit } = this.state
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(unit)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Unit creation with invalid input',
        alertContent: result
      })
      return
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.addunit(
        accountData.active,
        propertyId,
        unit.name,
        unit.bedrooms,
        unit.bathrooms,
        unit.sq_ft_min,
        unit.sq_ft_max,
        unit.rent_min,
        unit.rent_max,
        unit.status,
        new Date(unit.date_available).getTime(),
        options
      )
    } catch (err) {
      setErrMsg('Failed to create new unit')
      console.log('fsmgrcontract.addunit - error:', err)
      operationOK = false
    }

    try {
      setUnit(propertyId, unit)
      history.push(`/${propertyId}/unit`)
    } catch (err) {
      console.log('setUnit error:', err)
      operationOK = false
    }

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to create new Unit "${unit.name}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `New Unit "${unit.name}" created successfully`,
        type: 'success'
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
      state.unit = {
        ...prevState.unit,
        [name]: value
      }
      if (target.type === 'radio') {
        state.isLeased = value.toLowerCase() === 'leased'
      }
      return state
    })
  }

  async componentDidMount () {
    const { eosClient, accountData } = this.props

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      UNITIMG
    )

    const imgMultihashes = rows.map(row => row.ipfs_address)
    this.setState({ imgMultihashes })

    const { isCreating, properties } = this.props
    const { id, unitid } = this.props.match.params
    const { units } = properties[id]

    // Edit an existing unit
    if (!isCreating) {
      let existingUnit = units[unitid]
      this.setState({
        unit: existingUnit,
        isLeased: existingUnit.status.toLowerCase() === 'leased'
      })
    } else {
      // Create a new unit
      this.setState({
        unit: newUnit(),
        isLeased: false
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
        <UnitDetails
          unit={this.state.unit}
          isCreating={isCreating}
          isLeased={this.state.isLeased}
          propertyId={id}
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

const newUnit = () => ({
  name: '',
  bedrooms: 0,
  bathrooms: 0,
  sq_ft_min: 0,
  sq_ft_max: 0,
  rent_min: 0,
  rent_max: 0,
  status: 'Available',
  date_available: new Date().toISOString().split('T')[0]
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
  connect(
    mapStateToProps,
    { setUnit, setLoading, setOpResult, setErrMsg }
  )(UnitDetailsContainer)
)
