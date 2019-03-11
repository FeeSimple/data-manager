import React from 'react'
import LoadingView from '../layout/LoadingView'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

const { SearchBar } = Search

const columns = [
  {
    dataField: 'index',
    text: '#',
    sort: false,
    headerStyle: { width: 10 }
  },
  {
    dataField: 'time',
    text: 'Time',
    sort: true,
    headerStyle: { width: 40 }
  },
  {
    dataField: 'action',
    text: 'Action',
    sort: true,
    headerStyle: { width: 40 }
  },
  {
    dataField: 'quantity',
    text: 'Quantity',
    sort: true,
    headerStyle: { width: 50 }
  },
  {
    dataField: 'ramUsage',
    text: 'RAM Cost',
    sort: true,
    headerStyle: { width: 50 }
  },
  {
    dataField: 'cpuBwUsage',
    text: 'CPU & Bandwidth Cost',
    sort: true,
    headerStyle: { width: 90 }
  },
  {
    dataField: 'date_available',
    text: 'Transaction Link',
    formatter: (cellContent, row) => (
      <a href={row.txLink} target='_blank' className='table-edit'>
        {row.txId}
      </a>
    ),
    sort: false,
    headerStyle: { width: 50 }
  }
]

const UserActivity = ({ activityList }) => (
  <div className='col-lg-12'>
    {activityList.length === 0 ? (
      <LoadingView />
    ) : (
      <div>
        <br></br>
        <ToolkitProvider
          keyField='id'
          data={activityList}
          columns={columns}
          search={{ searchFormatted: true }}
          bootstrap4
        >
          {props => (
            <React.Fragment>
              <SearchBar
                {...props.searchProps}
                className='mb-3 tbl-search-input'
              />
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </React.Fragment>
          )}
        </ToolkitProvider>
      </div>
    )}
  </div>
)

export default UserActivity
