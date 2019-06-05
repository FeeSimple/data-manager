import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ecc from 'eosjs-ecc'
import {
  setProperty,
  addProperties,
  setLoading,
  setOpResult,
  delProperty
} from '../../../actions'
import PropertyDetails from './PropertyDetails'
import { FSMGRCONTRACT, PROPERTY, PROPERTYIMG } from '../../../utils/consts'
import Confirm from '../../layout/Confirm'
import Alert from '../../layout/Alert'

import ipfs from '../../layout/ipfs'

let totalUploadedFiles = 0
let ipfsUploadedFiles = 0

class PropertyDetailsContainer extends Component {
  state = {
    property: 'undefined',
    showConfirm: false,
    showConfirmDelImg: false,

    propertyId: null,
    imgId: null,

    imgIpfsAddrListFromUpload: [],
    imgIpfsAddrListFromTable: [],

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

  validator = property => {
    let alertContent = []
    if (property.name === '') {
      alertContent.push('Name is empty')
    }

    if (property.address_1 === '' && property.address_2 === '') {
      alertContent.push('Address is not valid')
    }

    if (property.city === '') {
      alertContent.push('City is empty')
    }

    if (property.postal_code === '') {
      alertContent.push('Zip/Postal Code is empty')
    }

    return alertContent
  }

  save = async e => {
    e.preventDefault()

    const { property, imgIpfsAddrListFromUpload } = this.state
    const {
      contracts,
      accountData,
      setLoading,
      setOpResult,
      setProperty,
      history
    } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(property)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Invalid input',
        alertContent: result
      })
      return
    }

    if (totalUploadedFiles !== 0 && totalUploadedFiles !== ipfsUploadedFiles) {
      console.log('IPFS image upload is still in progress')
      this.setState({
        alertShow: true,
        alertHeader: 'Please wait',
        alertContent: ['IPFS image upload is still in progress']
      })
      return
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.modproperty(
        accountData.active,
        property.id,
        property.name,
        property.address_1,
        property.address_2,
        property.city,
        property.region,
        property.postal_code,
        property.unit_count,
        options
      )

      setProperty(property)
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
          await fsmgrcontract.addpropimg(
            accountData.active,
            property.id,
            ecc.sha256(imgIpfsAddressListCleaned[i]),
            imgIpfsAddressListCleaned[i],
            options
          )
          console.log(
            `fsmgrcontract.addpropimg - OK (ipfs address:${
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

    history.push('/')

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to edit property "${property.name}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Property "${property.name}" edited successfully!`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  create = async e => {
    e.preventDefault()

    const {
      addProperties,
      contracts,
      eosClient,
      accountData,
      setLoading,
      setOpResult,
      history
    } = this.props
    const { property } = this.state
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(property)
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
      await fsmgrcontract.addproperty(
        accountData.active,
        property.name,
        property.address_1,
        property.address_2,
        property.city,
        property.region,
        property.postal_code,
        property.unit_count,
        options
      )

      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        PROPERTY
      )
      addProperties(rows)
    } catch (err) {
      operationOK = false
    }

    history.push('/')

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to create property "${property.name}."`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `New property "${property.name}" created successfully!`,
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
      state.property = {
        ...prevState.property,
        [name]: value
      }
      return state
    })
  }

  getPropertyName = propertyId => {
    const property = this.state.property
    if (!property) return ''
    console.log(`property id: ${propertyId}, property name: ${property.name}`)
    return property.name
  }

  deleteImg = async (id) => {
    this.handleToggleConfirmDelImg(-1)
    const imgId = this.state.imgId

    const {
      contracts,
      accountData,
      setLoading,
      setOpResult
    } = this.props

    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.delpropimg(accountData.active, imgId, options)
      console.log('fsmgrcontract.delpropimg - imgId:', imgId)
    } catch (err) {
      console.log('fsmgrcontract.delpropimg - error:', err)
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

  deleteOne = async () => {
    this.handleToggleConfirm(-1)
    const propertyId = this.state.propertyId

    const {
      addProperties,
      contracts,
      eosClient,
      accountData,
      setLoading,
      setOpResult,
      history
    } = this.props

    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.delproperty(accountData.active, propertyId, options)
      console.log('fsmgrcontract.delproperty - propertyId:', propertyId)
    } catch (err) {
      console.log('fsmgrcontract.delproperty - error:', err)
      operationOK = false
    }

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      PROPERTY
    )
    addProperties(rows)
    history.push('/')

    let propertyName = this.getPropertyName(propertyId)

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete property "${propertyName}!"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Property "${propertyName}" deleted successfully.`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  handleToggleConfirm = async propertyId => {
    const { showConfirm } = this.state
    this.setState({ showConfirm: !showConfirm })

    if (propertyId !== -1) {
      this.setState({
        propertyId: propertyId
      })

      console.log(`handleToggleConfirm - propertyId: ${propertyId}`)
    }
  }

  handleToggleConfirmDelImg = (imgId) => {
    const { showConfirmDelImg } = this.state
    this.setState({ showConfirmDelImg: !showConfirmDelImg })

    if (imgId !== -1) {
      this.setState({
        imgId
      })

      console.log(`handleToggleConfirmDelImg - imgId: ${imgId}`)
    }
  }

  async getImgIpfsAddrListFromTable () {
    const { id, eosClient, accountData } = this.props
    const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        PROPERTYIMG
      )

    console.log('get table PROPERTYIMG:', rows)

    const imgIpfsAddrListFromTable = rows
      .filter(row => row.property_id === Number(id))
      .map(row => {
        return {ipfs_address: row.ipfs_address, id: row.id}
      })

    console.log(
      'getImgIpfsAddrListFromTable:',
      imgIpfsAddrListFromTable
    )

    this.setState({ imgIpfsAddrListFromTable }) 
  }

  async componentDidMount () {
    const { isCreating, properties, id, eosClient, accountData } = this.props

    // Edit an existing property
    if (!isCreating) {
      let existingProperty = properties[id]
      this.setState({
        property: existingProperty
      })

      await this.getImgIpfsAddrListFromTable()

    } else {
      // Create a new property
      this.setState({
        property: newProperty()
      })
    }
  }

  render () {
    const { isCreating, properties, id } = this.props
    const { property, imgIpfsAddrListFromTable } = this.state

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
        {property && (
          <PropertyDetails
            property={property}
            isCreating={isCreating}
            onSaveClick={this.save}
            onCreateClick={this.create}
            onCancelClick={this.cancel}
            onChange={e => this.handleChange(e)}
            handleToggle={this.handleToggleConfirm}
            onImagesUploaded={this.onImagesUploaded}
            onImageDeleted={this.onImageDeleted}
            galleryItems={galleryItems}
            handleUploadedImg={this.handleUploadedImg}
            handleToggleConfirmDelImg={this.handleToggleConfirmDelImg}
          />
        )}
        <Confirm
          isOpen={this.state.showConfirm}
          handleToggle={this.handleToggleConfirm}
          onDelete={this.deleteOne}
          text='this property and its associated units and floor plans'
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

const newProperty = () => ({
  name: '',
  address_1: '',
  address_2: '',
  city: '',
  region: '',
  postal_code: '',
  unit_count: 0
})

function mapStateToProps ({
  properties,
  eosClient,
  scatter,
  contracts,
  accountData
}) {
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      setProperty,
      addProperties,
      delProperty,
      setLoading,
      setOpResult
    }
  )(PropertyDetailsContainer)
)
