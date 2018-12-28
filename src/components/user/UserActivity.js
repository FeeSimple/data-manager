import React from 'react'
import { Table } from 'reactstrap'
import LoadingView from '../layout/LoadingView'

const UserActivity = ({ activityList }) => (
  <div className='col-lg-12'>
    {activityList.length === 0 ? (
      <LoadingView />
    ) : (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Action</th>
            <th>Quantity</th>
            <th>RAM Cost</th>
            <th>CPU & Bandwidth Cost</th>
            <th>Transaction Link</th>
          </tr>
        </thead>
        <tbody>
          {activityList.map(item => (
            <tr role='row' className='even'>
              <th scope='row'>{item.index}</th>
              <td>{item.time}</td>
              <td>{item.action}</td>
              <td>{item.quantity}</td>
              <td>{item.ramUsage}</td>
              <td>{item.cpuBwUsage}</td>
              <td>
                <a href={item.txLink} target='_blank' className='table-edit'>
                  {item.txId}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
)

export default UserActivity
