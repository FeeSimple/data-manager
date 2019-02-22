import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { FLOORPLAN, FSMGRCONTRACT } from '../../../utils/consts'
import { addFloorplans, delFloorplan } from '../../../actions/index'
import { setLoading, setOpResult } from '../../../actions'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'
import Confirm from '../../layout/Confirm'

class FloorplansContainer extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.deleteOne = this.deleteOne.bind(this)
    this.deleteBulk = this.deleteBulk.bind(this)
    this.state = {
      checkedEntry: {},
      showConfirm: false,
      propertyId: 0,
      floorplanId: 0,
      deleteBulkDisabled: true
    }
  }

  async componentDidMount () {
    const { eosClient, accountData, addFloorplans } = this.props
    const { id } = this.props.match.params

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      FLOORPLAN
    )
    addFloorplans(id, rows)
  }

  onDelete = async () => {
    this.handleToggleConfirm(-1, -1);
    const { propertyId, floorplanId } = this.state
    if (propertyId !== -1 && floorplanId !== -1) {
      this.deleteOne(propertyId, floorplanId)
    } else {
      this.deleteBulk(propertyId)
    }
  }

  getFloorplanName = (floorplanId) => {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    if (!property) return ''
    let floorplan = property.floorplans[floorplanId]
    if (!floorplan) return ''
    console.log(`floorplan id: ${floorplanId}, floorplan name: ${floorplan.name}`);
    return floorplan.name
  }

  doDelete = async (propertyId, floorplanId) => {
    const { contracts, accountData, setLoading, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]
    console.log(
      `deleteOne - propertyId: ${propertyId}, floorplanId: ${floorplanId}`
    )
    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let operationOK = true

    try {
      await fsmgrcontract.delfloorplan(accountData.active, floorplanId, options)
      console.log('fsmgrcontract.delfloorplan - floorplanId:', floorplanId)
    } catch (err) {
      console.log('fsmgrcontract.delfloorplan - error:', err)
      operationOK = false
    }

    try {
      delFloorplan(propertyId, floorplanId)
      history.push(`/${propertyId}`)
    } catch (err) {
      console.log('delFloorplan error:', err)
      operationOK = false
    }

    return operationOK
  }

  deleteOne = async (propertyId, floorplanId) => {
    const { setLoading, setOpResult } = this.props

    setLoading(true)

    let operationOK = await this.doDelete(propertyId, floorplanId)
    let floorplanName = this.getFloorplanName(floorplanId)

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete floorplan "${floorplanName}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Floorplan "${floorplanName}" deleted successfully`,
        type: 'success',
      })
    }

    setLoading(false)
  }

  deleteBulk = async propertyId => {
    let checkedEntry = this.state.checkedEntry
    let ids = Object.keys(checkedEntry)
    console.log(`Floorplan deleteBulk - propertyId: ${propertyId}`)
    console.log('Floorplan deleteBulk - ids: ', ids)

    const { setLoading, setOpResult } = this.props

    setLoading(true)

    let failedFloorplans = ''

    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      if (checkedEntry[id] === true) {
        console.log(`Floorplan deleteBulk - id: ${id}`)
        let operationOK = await this.doDelete(propertyId, id)
        if (!operationOK) {
          failedFloorplans += `"${this.getFloorplanName(id)}", `
        }
      }
    }

    if (failedFloorplans !== '') {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete the following floorplans: ${failedFloorplans}` ,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Selected floorplans are deleted successfully`,
        type: 'success',
      })
    }

    setLoading(false)
  }

  isCheckedEntry = () => {
    let checkedEntry = this.state.checkedEntry
    let ids = Object.keys(checkedEntry)
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      if (checkedEntry[id] == true) {
        return true
      }
    }
    return false
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    let checked = this.state.checkedEntry
    checked[name] = value
    this.setState({
      checkedEntry: checked
    })

    this.setState({
      deleteBulkDisabled: !this.isCheckedEntry()
    })
  }

  handleToggleConfirm = (propertyId, floorplanId) => {
    const { showConfirm } = this.state
    this.setState({ showConfirm: !showConfirm })

    if (propertyId !== -1 || floorplanId !== -1) {
      this.setState({
        propertyId: propertyId,
        floorplanId: floorplanId
      })
      console.log(
        `handleToggleConfirm - propertyId: ${propertyId}, floorplanId: ${floorplanId}`
      )
    }
  }

  render () {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    if (!property) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return (
        <div>
          <Table
            propertyId={property.id}
            property={property}
            onChange={this.handleInputChange}
            handleToggle={this.handleToggleConfirm}
            deleteBulkDisabled={this.state.deleteBulkDisabled}
          />
          <Confirm
            isOpen={this.state.showConfirm}
            handleToggle={this.handleToggleConfirm}
            onDelete={this.onDelete}
            text='this floor-plan?'
          />
        </div>
      )
    }
  }
}

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
  connect(mapStateToProps, { addFloorplans, setLoading, delFloorplan, setOpResult })(
    FloorplansContainer
  )
)
