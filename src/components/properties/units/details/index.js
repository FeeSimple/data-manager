import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ecc from 'eosjs-ecc'

import { setUnit, setLoading, setErrMsg } from '../../../../actions'
import UnitDetails from './UnitDetails'
import { FSMGRCONTRACT, UNITIMG } from '../../../../utils/consts'

class UnitDetailsContainer extends Component {
  state = {
    prevUnit: {},
    unit: 'undefined',
    isLeased: true,
    buffer: null,
    imagesToUpload: [],
    imgMultihashes: []
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

  save = async e => {
    e.preventDefault()

    const propertyId = this.props.match.params.id
    const { unit, imagesToUpload } = this.state
    const { contracts, accountData, setLoading, setUnit, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)
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

    setLoading(false)
  }

  create = async e => {
    e.preventDefault()

    const { contracts, accountData, setLoading, history } = this.props
    const propertyId = this.props.match.params.id
    const { unit } = this.state
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

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
    }

    try {
      setUnit(propertyId, unit)
      history.push(`/${propertyId}/unit`)
    } catch (err) {
      console.log('setUnit error:', err)
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
  connect(mapStateToProps, { setUnit, setLoading, setErrMsg })(
    UnitDetailsContainer
  )
)
