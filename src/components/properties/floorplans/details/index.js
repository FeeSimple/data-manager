import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ecc from 'eosjs-ecc'

import { setFloorplan, setLoading, setOpResult } from '../../../../actions'
import FloorplanDetails from './FloorplanDetails'
import { FSMGRCONTRACT, FLOORPLANIMG } from '../../../../utils/consts'
import Alert from '../../../layout/Alert'

import ipfs from '../../../layout/ipfs'

let totalUploadedFiles = 0
let ipfsUploadedFiles = 0

class FloorplanDetailsContainer extends Component {
  state = {
    floorplan: 'undefined',
    buffer: null,
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

    const { imgIpfsAddrListFromUpload } = this.state
    const newImagesToUpload = [...imgIpfsAddrListFromUpload, ...multihashes]
    this.setState({ imgIpfsAddrListFromUpload: newImagesToUpload })
  }

  onImageDeleted = url => {
    const { imgIpfsAddrListFromUpload } = this.state
    const newImagesToUpload = [...imgIpfsAddrListFromUpload]
    newImagesToUpload.splice(imgIpfsAddrListFromUpload.indexOf(url), 1)

    this.setState({ imgIpfsAddrListFromUpload: newImagesToUpload })
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
    const { floorplan, imgIpfsAddrListFromUpload } = this.state
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
        alertHeader: 'Invalid input',
        alertContent: result
      })
      return
    }

    if (totalUploadedFiles !== 0 && totalUploadedFiles !== ipfsUploadedFiles) {
      console.log('IPFS image uploading is still in progress')
      this.setState({
        alertShow: true,
        alertHeader: 'Please wait',
        alertContent: ['IPFS image uploading is still in progress']
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
      console.log(
        `Floorplan ${floorplan.id} of the property ${propertyId} edited OK`
      )
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
          await fsmgrcontract.addflplanimg(
            accountData.active,
            floorplan.id,
            ecc.sha256(imgIpfsAddressListCleaned[i]),
            imgIpfsAddressListCleaned[i],
            options
          )
          console.log(
            `fsmgrcontract.addflplanimg - OK (ipfs address:${
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

    history.push(`/${propertyId}`)

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to edit floorplan "${floorplan.name}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Floorplan "${floorplan.name}" edited successfully`,
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
      history,
      setOpResult
    } = this.props
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
        text: `Failed to create new floorplan "${floorplan.name}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `New floorplan "${floorplan.name}" created successfully`,
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
      state.floorplan = {
        ...prevState.floorplan,
        [name]: value
      }
      return state
    })
  }

  async componentDidMount () {
    const { eosClient, accountData, isCreating, properties } = this.props
    const { id, floorplanId } = this.props.match.params
    const { floorplans } = properties[id]

    // Edit an existing floorplan
    if (!isCreating) {
      let existingFloorplan = floorplans[floorplanId]
      this.setState({
        floorplan: existingFloorplan
      })

      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        FLOORPLANIMG
      )

      console.log('get table FLOORPLANIMG:', rows)

      const imgIpfsAddrListFromTable = rows
        .filter(row => row.floorplan_id === Number(floorplanId))
        .map(row => row.ipfs_address)

      console.log(
        'componentDidMount - imgIpfsAddrListFromTable:',
        imgIpfsAddrListFromTable
      )

      this.setState({ imgIpfsAddrListFromTable })
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
    const { imgIpfsAddrListFromTable } = this.state

    let galleryItems = []
    for (let i = 0; i < imgIpfsAddrListFromTable.length; i++) {
      let imgItem = {
        original: `https://ipfs.infura.io:5001/api/v0/cat?arg=${
          imgIpfsAddrListFromTable[i]
        }&stream-channels=true`,
        thumbnail: `https://ipfs.infura.io:5001/api/v0/cat?arg=${
          imgIpfsAddrListFromTable[i]
        }&stream-channels=true`
      }
      galleryItems.push(imgItem)
    }

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
          handleUploadedImg={this.handleUploadedImg}
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
  connect(
    mapStateToProps,
    { setFloorplan, setLoading, setOpResult }
  )(FloorplanDetailsContainer)
)
