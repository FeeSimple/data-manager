import React from 'react'
import { 
  Table, Card
} from 'reactstrap'


const progressColor = (valueStr) => {
  let val = parseInt(valueStr)
  if (val >= 50) {
    return null // blue color
  } else if (val >= 20) {
    return "warning"
  } else {
    return "danger"
  }
}

const UserActivity = ({
  activityList
}) => (
  <div className="col-lg-8 offset-md-1 offset-lg-2">
    <Table striped borderless>
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Action</th>
          <th>Quantity</th>
          <th>Transaction Link</th>
        </tr>
      </thead>
      <tbody>
        {
          activityList.map(item => (
            <tr role="row" className="even">
              <th scope="row">{item.index}</th>
              <td>{item.time}</td>
              <td>{item.action}</td>
              <td>{item.quantity}</td>
              <td><a href={item.txLink} target="_blank" className="table-edit">{item.txId}</a></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  </div>
)

export default UserActivity