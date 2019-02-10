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
    unit: newUnit(),
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
    const { contracts, accountData, setLoading, setUnit } = this.props
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
  }

  render () {
    const { isCreating, properties } = this.props
    const { id, unitid } = this.props.match.params
    const { units } = properties[id]
    const { imgMultihashes } = this.state

    const galleryItems = imgMultihashes.map(multihash => ({
      original: `https://gateway.ipfs.io/ipfs/${multihash}/`,
      thumbnail: `https://gateway.ipfs.io/ipfs/${multihash}/`
    }))

    let unit = isCreating ? this.state.unit : units[unitid]

    return (
      <div>
        {typeof unit === 'undefined' && (
          <h1 className='text-center my-5 py-5'>404 - Unit not found</h1>
        )}
        {typeof unit !== 'undefined' && (
          <UnitDetails
            unit={unit}
            isCreating={isCreating}
            propertyId={id}
            onSaveClick={this.save}
            onCreateClick={this.create}
            onCancelClick={this.cancel}
            onChange={e => this.handleChange(e)}
            onImagesUploaded={this.onImagesUploaded}
            onImageDeleted={this.onImageDeleted}
            galleryItems={galleryItems}
          />
        )}
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
  status: '',
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
