import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  setTermPrice,
  setLoading,
  setOpResult,
  setErrMsg
} from '../../../../actions'
import TermPriceDetails from './TermPriceDetails'
import { FSMGRCONTRACT } from '../../../../utils/consts'
import Alert from '../../../layout/Alert'

class TermPriceDetailsContainer extends Component {
  state = {
    termprice: 'undefined',
    buffer: null,

    alertShow: false,
    alertContent: [],
    alertHeader: ''
  }

  handleToggleAlert = () => {
    const { alertShow } = this.state
    this.setState({ alertShow: !alertShow })
  }

  validator = termprice => {
    let alertContent = []
    if (Number(termprice.rent) <= 0) {
      alertContent.push('Invalid Rent')
    }

    if (Number(termprice.term) <= 0) {
      alertContent.push('Invalid Term')
    }

    let startDate = new Date(termprice.start_date).getTime()
    let endDate = new Date(termprice.end_date).getTime()
    // let currentDate = new Date().getTime()
    // if (startDate < currentDate) {
    //   alertContent.push('Start date in the past')
    // }
    // if (endDate < currentDate) {
    //   alertContent.push('End date in the past')
    // }
    if (endDate == startDate) {
      alertContent.push('End date same as Start date')
    }
    if (endDate < startDate) {
      alertContent.push('End date before Start date')
    }

    return alertContent
  }

  save = async e => {
    e.preventDefault()

    const { id, unitid } = this.props.match.params
    const { termprice } = this.state
    const {
      contracts,
      accountData,
      setLoading,
      setOpResult,
      setTermPrice,
      history
    } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(termprice)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Term price editing with invalid input',
        alertContent: result
      })
      return
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.modtmpricing(
        accountData.active,
        termprice.id,
        unitid,
        termprice.rent,
        termprice.term,
        new Date(termprice.start_date).getTime(),
        new Date(termprice.end_date).getTime(),
        options
      )
    } catch (err) {
      setErrMsg('Failed to save termprice')
      console.log('fsmgrcontract.modtmpricing - error:', err)
      operationOK = false
    }

    try {
      setTermPrice(id, unitid, termprice)
      history.push(`/${id}/unit/${unitid}/termprice`)
    } catch (err) {
      console.log('setTermPrice error:', err)
      operationOK = false
    }

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to edit Term Price "${termprice.term}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `Term Price "${termprice.term}" edited successfully`,
        type: 'success'
      })
    }

    setLoading(false)
  }

  create = async e => {
    e.preventDefault()

    const { id, unitid } = this.props.match.params
    const { termprice } = this.state
    const {
      contracts,
      accountData,
      setLoading,
      history,
      setOpResult
    } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    // console.log('term price create - this.state:', this.state)
    console.log(
      'term price create - this.props.match.params:',
      this.props.match.params
    )
    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(termprice)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Term price creation with invalid input',
        alertContent: result
      })
      return
    }

    setLoading(true)

    let operationOK = true

    try {
      await fsmgrcontract.addtmpricing(
        accountData.active,
        unitid,
        termprice.rent,
        termprice.term,
        new Date(termprice.start_date).getTime(),
        new Date(termprice.end_date).getTime(),
        options
      )
    } catch (err) {
      setErrMsg('Failed to create new termprice')
      console.log('fsmgrcontract.addtmpricing - error:', err)
      operationOK = false
    }

    try {
      // Do not call setTermPrice() here
      // Otherwise, undefined termprice's id is created?
      // setTermPrice(id, unitid, termprice)
      history.push(`/${id}/unit/${unitid}/termprice`)
    } catch (err) {
      console.log('setTermPrice error:', err)
      operationOK = false
    }

    if (!operationOK) {
      setOpResult({
        show: true,
        title: 'Internal Service Error',
        text: `Failed to create new Term Price "${termprice.term}"`,
        type: 'error'
      })
    } else {
      setOpResult({
        show: true,
        title: 'Success',
        text: `New Term Price "${termprice.term}" created successfully`,
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
      state.termprice = {
        ...prevState.termprice,
        [name]: value
      }
      return state
    })
  }

  async componentDidMount () {
    const { isCreating, properties } = this.props
    const { id, unitid, termid } = this.props.match.params
    const { units } = properties[id]

    // Edit an existing termprice
    if (!isCreating) {
      let existingTermprice = units[unitid].termprices[termid]
      this.setState({
        termprice: existingTermprice
      })
    } else {
      // Create a new termprice
      this.setState({
        termprice: newTermPrice()
      })
    }
  }

  render () {
    const { isCreating } = this.props
    const { id, unitid } = this.props.match.params

    return (
      <div>
        <TermPriceDetails
          termprice={this.state.termprice}
          propertyId={id}
          unitId={unitid}
          isCreating={isCreating}
          onSaveClick={this.save}
          onCreateClick={this.create}
          onCancelClick={this.cancel}
          onChange={e => this.handleChange(e)}
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

const newTermPrice = () => ({
  rent: 0,
  term: 0,
  start_date: new Date().toISOString().split('T')[0],
  end_date: new Date().toISOString().split('T')[0]
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
    {
      setTermPrice,
      setLoading,
      setErrMsg,
      setOpResult
    }
  )(TermPriceDetailsContainer)
)
