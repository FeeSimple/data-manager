import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setTermPrice, setLoading, setErrMsg } from '../../../../actions'
import TermPriceDetails, {
  READING,
  EDITING,
  CREATING
} from './TermPriceDetails'
import { FSMGRCONTRACT } from '../../../../utils/consts'

class TermPriceDetailsContainer extends Component {
  state = {
    mode: READING,
    prevTermPrice: {},

    termprice: newTermPrice,
    buffer: null
  }

  edit = (e, termprice) => {
    e.preventDefault()

    this.setState({
      mode: EDITING,
      termprice,
      prevTermPrice: {
        ...termprice
      }
    })
  }

  save = async e => {
    e.preventDefault()

    const { id, unitid } = this.props.match.params
    const { termprice } = this.state
    const {
      contracts,
      accountData,
      setLoading,
      setTermPrice,
      history
    } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

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
    }

    try {
      setTermPrice(id, unitid, termprice)
      history.push(`/${id}/unit/${unitid}/termprice`)
    } catch (err) {
      console.log('setTermPrice error:', err)
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
      setTermPrice,
      history
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
    this.setState({ mode: READING })

    setLoading(true)

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
    }

    try {
      // Do not call setTermPrice() here
      // Otherwise, undefined termprice's id is created?
      // setTermPrice(id, unitid, termprice)
      history.push(`/${id}/unit/${unitid}/termprice`)
    } catch (err) {
      console.log('setTermPrice error:', err)
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
    const { eosClient, accountData } = this.props
  }

  render () {
    const { isCreating, properties } = this.props
    const { id, unitid, termid } = this.props.match.params
    const { units } = properties[id]

    console.log('termprice details render - this.props:', this.props)

    console.log('termprice details render - this.state:', this.state)
    console.log('termprice details render - isCreating:', isCreating)

    const mode = isCreating ? CREATING : this.state.mode
    let termprice =
      mode === EDITING || mode === CREATING
        ? this.state.termprice
        : units[unitid].termprices[termid]
    return (
      <div>
        {typeof termprice === 'undefined' && (
          <h1 className='text-center my-5 py-5'>404 - Term Price not found</h1>
        )}
        {typeof termprice !== 'undefined' && (
          <TermPriceDetails
            termprice={termprice}
            mode={mode}
            onEditClick={this.edit}
            onSaveClick={this.save}
            onCreateClick={this.create}
            onCancelClick={this.cancel}
            onChange={e => this.handleChange(e)}
          />
        )}
      </div>
    )
  }
}

const newTermPrice = () => ({
  rent: 0,
  term: 0,
  start_date: 0,
  end_date: 0
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
  connect(mapStateToProps, { setTermPrice, setLoading, setErrMsg })(
    TermPriceDetailsContainer
  )
)
