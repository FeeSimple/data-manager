import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { TERMPRICE, FSMGRCONTRACT } from '../../../utils/consts'
import { addTermPrices, delTermPrice } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'
import { setLoading, setOpResult } from '../../../actions'
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
      deleteBulkDisabled: true,
      isAdding: true
    }
  }

  async componentDidMount () {
    this.setState({
      isAdding: true
    })

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

    this.setState({
      isAdding: false
    })
  }

  onDelete = async () => {
    this.handleToggleConfirm(-1, -1, -1)
    const { propertyId, unitId, termpriceId } = this.state
    if (propertyId !== -1 && unitId !== -1 && termpriceId !== undefined) {
      await this.deleteOne(propertyId, unitId, termpriceId)
    } else {
      await this.deleteBulk(propertyId, unitId)
    }
  }

  getTerm = (propertyId, unitId, termpriceId) => {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    if (!property) return ''
    const unit = property.units[unitId]
    if (!unit) return ''
    let termprice = unit.termprices[termpriceId]
    if (!termprice) return ''
    console.log(`term id: ${termpriceId}, term: ${termprice.term}`)
    return termprice.term
  }

  deleteOne = async (propertyId, unitId, termpriceId) => {
    const { setLoading, setOpResult } = this.props

    setLoading(true)

    let operationOK = await this.doDelete(propertyId, unitId, termpriceId)
    let term = this.getTerm(propertyId, unitId, termpriceId)

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete term price "${term}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Term price "${term}" deleted successfully`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  doDelete = async (propertyId, unitId, termpriceId) => {
    const { contracts, accountData, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let operationOK = true

    try {
      await fsmgrcontract.deltmpricing(accountData.active, termpriceId, options)
      console.log('fsmgrcontract.deltmpricing - unitId:', unitId)
    } catch (err) {
      console.log('fsmgrcontract.deltmpricing - error:', err)
      operationOK = false
    }

    try {
      delTermPrice(propertyId, unitId, termpriceId)
      history.push(`/${propertyId}/unit/${unitId}/termprice`)
    } catch (err) {
      console.log('delTermPrice error:', err)
      operationOK = false
    }

    return operationOK
  }

  deleteBulk = async (propertyId, unitId) => {
    let checkedEntry = this.state.checkedEntry
    let ids = Object.keys(checkedEntry)
    console.log(
      `Term price deleteBulk - propertyId: ${propertyId}, unitId: ${unitId}`
    )
    console.log('Term price deleteBulk - ids: ', ids)

    const { setLoading, setOpResult } = this.props

    setLoading(true)

    let failedTermPrices = ''

    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      if (checkedEntry[id] === true) {
        console.log(`Term price deleteBulk - id: ${id}`)
        let operationOK = await this.doDelete(propertyId, unitId, id)
        if (!operationOK) {
          failedTermPrices += `"${this.getTerm(propertyId, unitId, id)}", `
        }
      }
    }

    if (failedTermPrices !== '') {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete the following term prices: ${failedTermPrices}`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Selected term prices are deleted successfully`,
        type: 'success'
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
    const { properties, setOpResult } = this.props
    const { id, unitid, termid } = this.props.match.params
    const property = properties[id]
    const unit = property.units[unitid]

    if (!property || !unit) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      const noTermPrices = Object.keys(unit.termprices).length === 0
      const showFooter = !this.state.isAdding && noTermPrices

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
            showFooter={showFooter}
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
  connect(
    mapStateToProps,
    {
      addTermPrices,
      setLoading,
      delTermPrice,
      setOpResult
    }
  )(TermPriceContainer)
)
