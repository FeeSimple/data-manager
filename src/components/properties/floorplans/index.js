import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { FLOORPLAN, FSMGRCONTRACT } from '../../../utils/consts'
import { addFloorplans, delFloorplan } from '../../../actions/index'
import { setLoading } from '../../../actions'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'

class FloorplansContainer extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      checkedEntry: {}
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

  deleteOne = async (propertyId, floorplanId) => {
    const { contracts, accountData, setLoading, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    try {
      await fsmgrcontract.delfloorplan(accountData.active, floorplanId, options)
      console.log('fsmgrcontract.delfloorplan - floorplanId:', floorplanId)
    } catch (err) {
      console.log('fsmgrcontract.delfloorplan - error:', err)
    }

    try {
      delFloorplan(propertyId, floorplanId)
      history.push(`/${propertyId}`)
    } catch (err) {
      console.log('delFloorplan error:', err)
    }

    setLoading(false)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // console.log(`handleInputChange - name: ${name}, value: ${value}`);

    let checked = this.state.checkedEntry
    checked[name] = value
    this.setState({
      checkedEntry: checked
    });

    // console.log('handleInputChange - this.state.checkedEntry:', this.state.checkedEntry);
  }

  render () {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    if (!property) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return (
        <Table
          propertyId={property.id}
          property={property}
          onDelete={this.deleteOne}
          onChange={this.handleInputChange}
        />
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
  connect(mapStateToProps, { addFloorplans, setLoading, delFloorplan })(
    FloorplansContainer
  )
)
