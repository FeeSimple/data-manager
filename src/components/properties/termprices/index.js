import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { TERMPRICE, FSMGRCONTRACT } from '../../../utils/consts'
import { addTermPrices, delTermPrice } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'
import { setLoading } from '../../../actions'
import Confirm from '../../layout/Confirm'

class TermPriceContainer extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.deleteOne = this.deleteOne.bind(this)
    this.deleteBulk = this.deleteBulk.bind(this)
    this.state = {
      checkedEntry: {},
      showConfirm: false,
      propertyId: 0,
      unitId: 0,
      termpriceId: 0,
      deleteBulkDisabled: true
    }
  }

  async componentDidMount () {
    const { eosClient, accountData, addTermPrices } = this.props
    const { id, unitid } = this.props.match.params

    try {
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        TERMPRICE
      )
      console.log('Get table "termpricing" result:', rows)

      try {
        addTermPrices(id, unitid, rows)
      } catch (err) {
        console.log('addTermPrices error:', err)
      }
    } catch (err) {
      console.log('Get table "termpricing" failed - err:', err)
    }
  }

  onDelete = async () => {
    const { propertyId, unitId, termpriceId } = this.state
    if (propertyId !== -1 && unitId !== -1 && termpriceId !== undefined) {
      await this.deleteOne(propertyId, unitId, termpriceId)
    } else {
      await this.deleteBulk(propertyId, unitId)
    }
  }

  deleteOne = async (propertyId, unitId, termpriceId) => {
    const { contracts, accountData, setLoading, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]
    console.log(
      `deleteOne - propertyId: ${propertyId}, unitId: ${unitId}, termpriceId: ${termpriceId}`
    )
    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    try {
      await fsmgrcontract.deltmpricing(accountData.active, termpriceId, options)
      console.log('fsmgrcontract.deltmpricing - unitId:', unitId)
    } catch (err) {
      console.log('fsmgrcontract.deltmpricing - error:', err)
    }

    try {
      delTermPrice(propertyId, unitId, termpriceId)
      history.push(`/${propertyId}/unit/${unitId}/termprice`)
    } catch (err) {
      console.log('delTermPrice error:', err)
    }

    setLoading(false)
  }

  deleteBulk = async (propertyId, unitId) => {
    let checkedEntry = this.state.checkedEntry
    let ids = Object.keys(checkedEntry)
    console.log(`deleteBulk - propertyId: ${propertyId}, unitId: ${unitId}`)
    console.log('deleteBulk - ids: ', ids)

    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      if (checkedEntry[id] === true) {
        console.log(`deleteBulk - id: ${id}`)
        await this.deleteOne(propertyId, unitId, id)
      }
    }
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

  handleToggleConfirm = (propertyId, unitId, termpriceId) => {
    const { showConfirm } = this.state
    this.setState({ showConfirm: !showConfirm })

    if (propertyId !== -1 || unitId !== -1 || termpriceId !== -1) {
      this.setState({
        propertyId: propertyId,
        unitId: unitId,
        termpriceId: termpriceId
      })
      console.log(
        `handleToggleConfirm - propertyId: ${propertyId}, unitId: ${unitId}, termpriceId: ${termpriceId}`
      )
    }
  }

  render () {
    const { properties } = this.props
    const { id, unitid, termid } = this.props.match.params
    const property = properties[id]
    const unit = property.units[unitid]

    if (!property || !unit) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return (
        <div>
          <Table
            propertyId={property.id}
            unitid={unitid}
            unit={unit}
            termid={termid}
            onChange={this.handleInputChange}
            handleToggle={this.handleToggleConfirm}
            deleteBulkDisabled={this.state.deleteBulkDisabled}
          />
          <Confirm
            isOpen={this.state.showConfirm}
            handleToggle={this.handleToggleConfirm}
            onDelete={this.onDelete}
            text='this termprice?'
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
  connect(mapStateToProps, { addTermPrices, setLoading, delTermPrice })(
    TermPriceContainer
  )
)
