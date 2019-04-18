import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { UNIT, FSMGRCONTRACT, PROPERTY } from '../../../utils/consts'
import { addUnits, delUnit } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'
import { setLoading, setOpResult, addProperties } from '../../../actions'
import Confirm from '../../layout/Confirm'

class UnitContainer extends Component {
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
      deleteBulkDisabled: true,
      isAdding: true
    }
  }

  async componentDidMount () {
    this.setState({
      isAdding: true
    })

    const { eosClient, accountData, addUnits } = this.props
    const { id } = this.props.match.params

    try {
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        UNIT
      )
      console.log('Get table "unit" result:', rows)

      try {
        addUnits(id, rows)
      } catch (err) {
        console.log('addUnits error:', err)
      }
    } catch (err) {
      console.log('Get table "unit" failed - err:', err)
    }

    this.setState({
      isAdding: false
    })
  }

  onDelete = async () => {
    this.handleToggleConfirm(-1, -1)
    const { propertyId, unitId } = this.state
    if (propertyId !== -1 && unitId === -2) {
      this.deleteProperty(propertyId)
    } else {
      if (propertyId !== -1 && unitId !== -1) {
        await this.deleteOne(propertyId, unitId)
      } else {
        await this.deleteBulk(propertyId)
      }
    }
  }

  getPropertyName = propertyId => {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    return property.name
  }

  deleteProperty = async propertyId => {
    // this.handleToggleConfirm(-1)

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
        text: `Failed to delete property "${propertyName}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Property "${propertyName}" deleted successfully`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  deleteOne = async (propertyId, unitId) => {
    const { setLoading, setOpResult } = this.props

    setLoading(true)

    let operationOK = await this.doDelete(propertyId, unitId)
    let unitName = this.getUnitName(unitId)

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete unit "${unitName}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Unit "${unitName}" deleted successfully`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  doDelete = async (propertyId, unitId) => {
    const { contracts, accountData } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]
    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let operationOK = true

    try {
      await fsmgrcontract.delunit(accountData.active, unitId, options)
      console.log('fsmgrcontract.delunit - unitId:', unitId)
    } catch (err) {
      console.log('fsmgrcontract.delunit - error:', err)
      operationOK = false
    }

    try {
      delUnit(propertyId, unitId)
    } catch (err) {
      console.log('delUnit error:', err)
      operationOK = false
    }

    return operationOK
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

  getUnitName = unitId => {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    if (!property) return ''
    let unit = property.units[unitId]
    if (!unit) return ''
    console.log(`unit id: ${unitId}, unit name: ${unit.name}`)
    return unit.name
  }

  deleteBulk = async propertyId => {
    let checkedEntry = this.state.checkedEntry
    let ids = Object.keys(checkedEntry)
    console.log(`Unit deleteBulk - propertyId: ${propertyId}`)
    console.log('Unit deleteBulk - ids: ', ids)

    const { setLoading, setOpResult } = this.props

    setLoading(true)

    let failedUnits = ''

    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      if (checkedEntry[id] === true) {
        console.log(`Unit deleteBulk - id: ${id}`)
        let operationOK = await this.doDelete(propertyId, id)
        if (!operationOK) {
          failedUnits += `"${this.getUnitName(id)}", `
        }
      }
    }

    if (failedUnits !== '') {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to delete the following units: ${failedUnits}`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Selected units have been deleted successfully`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  handleToggleConfirm = (propertyId, unitId) => {
    const { showConfirm } = this.state
    this.setState({ showConfirm: !showConfirm })

    if (propertyId !== -1 || unitId !== -1) {
      this.setState({
        propertyId: propertyId,
        unitId: unitId
      })
    }
  }

  render () {
    const { properties, setOpResult } = this.props
    const { id } = this.props.match.params
    const property = properties[id]

    if (!property) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      const noUnits = Object.keys(property.units).length === 0
      const showFooter = !this.state.isAdding && noUnits

      return (
        <div>
          <Table
            propertyId={property.id}
            property={property}
            onChange={this.handleInputChange}
            handleToggle={this.handleToggleConfirm}
            deleteBulkDisabled={this.state.deleteBulkDisabled}
            showFooter={showFooter}
          />
          <Confirm
            isOpen={this.state.showConfirm}
            handleToggle={this.handleToggleConfirm}
            onDelete={this.onDelete}
            text={
              this.state.unitId === -2 && this.state.propertyId !== -1
                ? 'this property'
                : 'this unit?'
            }
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
    { addUnits, setLoading, delUnit, setOpResult, addProperties }
  )(UnitContainer)
)
