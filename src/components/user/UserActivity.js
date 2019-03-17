import React from 'react'
import LoadingView from '../layout/LoadingView'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

const { SearchBar } = Search

const columns = [
  {
    dataField: 'time',
    text: 'Time',
    sort: true,
    headerStyle: { width: 75 }
  },
  {
    dataField: 'action',
    text: 'Action',
    sort: true,
    headerStyle: { width: 35 }
  },
  {
    dataField: 'quantity',
    text: 'Quantity',
    sort: true,
    headerStyle: { width: 60 }
  },
  {
    dataField: 'ramUsage',
    text: 'RAM',
    sort: true,
    headerStyle: { width: 35 }
  },
  {
    dataField: 'cpuBwUsage',
    text: 'CPU & Bandwidth',
    sort: true,
    headerStyle: { width: 70 }
  },
  {
    dataField: 'date_available',
    text: 'Transaction',
    formatter: (cellContent, row) => (
      <a href={row.txLink} target='_blank' className='table-edit'>
        {row.txId}
      </a>
    ),
    sort: false,
    headerStyle: { width: 40 }
  }
]

const UserActivity = ({ activityList }) => (
  <div className='col-lg-12'>
    {activityList.length === 0 ? (
      <LoadingView />
    ) : (
      <div>
        <br />
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
                pagination={paginationFactory({
                  sizePerPage: 5,
                  sizePerPageList: [
                    {
                      text: '5',
                      value: 5
                    },
                    {
                      text: '10',
                      value: 10
                    },
                    {
                      text: 'All',
                      value: activityList.length
                    }
                  ]
                })}
              />
            </React.Fragment>
          )}
        </ToolkitProvider>
      </div>
    )}
  </div>
)

export default UserActivity
