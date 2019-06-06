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
import Confirm from '../../../layout/Confirm'
import ipfs from '../../../layout/ipfs'

let totalUploadedFiles = 0
let ipfsUploadedFiles = 0

class UnitDetailsContainer extends Component {
  state = {
    prevUnit: {},
    unit: 'undefined',
    isLeased: true,
    buffer: null,
    imgIpfsAddrListFromUpload: [],
    imgIpfsAddrListFromTable: [],

    showConfirmDelImg: false,
    imgId: null,

    alertShow: false,
    alertContent: [],
    alertHeader: ''
  }

  // It takes long time to upload img to IPFS and thus must popup waiting notification when clicking "Save"
  // while the img-uploading process is still in progress
  handleUploadedImg = acceptedFiles => {
    totalUploadedFiles = acceptedFiles.length
    ipfsUploadedFiles = 0

    acceptedFiles.map(file => {
      // console.log('file:', file);
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        let fileBuf = Buffer(reader.result)
        // console.log('file buffer', fileBuf)

        ipfs.files.add(fileBuf, (error, result) => {
          ipfsUploadedFiles++

          if (error) {
            console.error(error)
            return
          }
          let ipfsAddress = result[0].hash
          console.log('ipfs.files.add - ipfs-address: ', ipfsAddress)

          let curImagesToUpload = this.state.imgIpfsAddrListFromUpload
          curImagesToUpload.push(ipfsAddress)

          this.setState({ imgIpfsAddrListFromUpload: curImagesToUpload })
        })
      }
    })
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

    if (Number(unit.sq_ft_min) < 0) {
      alertContent.push('Invalid Sq. Ft. Min')
    }

    if (Number(unit.sq_ft_max) <= 0) {
      alertContent.push('Invalid Sq. Ft. Max')
    }

    if (Number(unit.sq_ft_max) < Number(unit.sq_ft_min)) {
      alertContent.push('Sq. Ft. Max < Sq. Ft. Min')
    }

    if (Number(unit.rent_min) < 0) {
      alertContent.push('Invalid Rent Min')
    }

    if (Number(unit.rent_max) <= 0) {
      alertContent.push('Invalid Rent Max')
    }

    if (Number(unit.rent_max) < Number(unit.rent_min)) {
      alertContent.push('Rent Max < Rent Min')
    }

    return alertContent
  }

  save = async e => {
    e.preventDefault()

    const propertyId = this.props.match.params.id
    const { unit, imgIpfsAddrListFromUpload } = this.state
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
        alertHeader: 'Invalid input',
        alertContent: result
      })
      return
    }

    if (totalUploadedFiles !== 0 && totalUploadedFiles !== ipfsUploadedFiles) {
      console.log('IPFS image uploading is still in progress.')
      this.setState({
        alertShow: true,
        alertHeader: 'Please wait',
        alertContent: ['IPFS image uploading is still in progress.']
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

    if (imgIpfsAddrListFromUpload.length > 0) {
      // Mapping values to object keys removes duplicates.
      const imgIpfsAddressMap = {}
      imgIpfsAddrListFromUpload.forEach(ipfsAddr => {
        imgIpfsAddressMap[ipfsAddr] = ipfsAddr
      })

      let imgIpfsAddressListCleaned = Object.values(imgIpfsAddressMap)
      for (let i = 0; i < imgIpfsAddressListCleaned.length; i++) {
        try {
          await fsmgrcontract.addunitimg(
            accountData.active,
            unit.id,
            ecc.sha256(imgIpfsAddressListCleaned[i]),
            imgIpfsAddressListCleaned[i],
            options
          )
          console.log(
            `fsmgrcontract.addunitimg - OK (ipfs address:${
              imgIpfsAddressListCleaned[i]
            })`
          )
        } catch (err) {}
      }

      // Clear images after done
      this.setState({
        imgIpfsAddrListFromUpload: []
      })
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
        text: `Unit "${unit.name}" edited successfully!`,
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
        alertHeader: 'Invalid input',
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
        text: `New Unit "${unit.name}" created successfully!`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  deleteImg = async id => {
    this.handleToggleConfirmDelImg(-1)
    const imgId = this.state.imgId

    const { contracts, accountData, setLoading, setOpResult } = this.props

    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.delunitimg(accountData.active, imgId, options)
      console.log('fsmgrcontract.delunitimg - imgId:', imgId)
    } catch (err) {
      console.log('fsmgrcontract.delunitimg - error:', err)
      operationOK = false
    }

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete image`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Image deleted successfully`,
        type: 'success'
      })
    }

    setLoading(false)

    await this.getImgIpfsAddrListFromTable()
  }

  handleToggleConfirmDelImg = imgId => {
    const { showConfirmDelImg } = this.state
    this.setState({ showConfirmDelImg: !showConfirmDelImg })

    if (imgId !== -1) {
      this.setState({
        imgId
      })

      console.log(`handleToggleConfirmDelImg - imgId: ${imgId}`)
    }
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

  async getImgIpfsAddrListFromTable () {
    const { eosClient, accountData } = this.props
    const { id, unitid } = this.props.match.params
    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      UNITIMG
    )

    const imgIpfsAddrListFromTable = rows
      .filter(row => row.unit_id === Number(unitid))
      .map(row => {
        return { ipfs_address: row.ipfs_address, id: row.id }
      })

    console.log(
      'componentDidMount - imgIpfsAddrListFromTable:',
      imgIpfsAddrListFromTable
    )

    this.setState({ imgIpfsAddrListFromTable })
  }

  async componentDidMount () {
    const { eosClient, accountData, isCreating, properties } = this.props

    const { id, unitid } = this.props.match.params
    const { units } = properties[id]

    // Edit an existing unit
    if (!isCreating) {
      let existingUnit = units[unitid]
      this.setState({
        unit: existingUnit,
        isLeased: existingUnit.status.toLowerCase() === 'leased'
      })

      await this.getImgIpfsAddrListFromTable()
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
    const { imgIpfsAddrListFromTable } = this.state

    let galleryItems = []
    for (let i = 0; i < imgIpfsAddrListFromTable.length; i++) {
      let imgItem = {
        original: `https://ipfs.infura.io:5001/api/v0/cat?arg=${
          imgIpfsAddrListFromTable[i].ipfs_address
        }&stream-channels=true`,
        thumbnail: `https://ipfs.infura.io:5001/api/v0/cat?arg=${
          imgIpfsAddrListFromTable[i].ipfs_address
        }&stream-channels=true`,
        id: imgIpfsAddrListFromTable[i].id
      }
      galleryItems.push(imgItem)
    }

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
          handleUploadedImg={this.handleUploadedImg}
          handleToggleConfirmDelImg={this.handleToggleConfirmDelImg}
        />
        <Confirm
          isOpen={this.state.showConfirmDelImg}
          handleToggle={this.handleToggleConfirmDelImg}
          onDelete={this.deleteImg}
          text='this image'
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
