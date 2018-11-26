import React from 'react'
import { 
  Table, Card
} from 'reactstrap'
import { Link } from 'react-router-dom'


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
    <Card>
      <Table>
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
                <td><input type="checkbox" /></td>
                <td>{item.time}</td>
                <td>{item.action}</td>
                <td>{item.quantity}</td>
                <td>{item.txLink}</td>
                <td><Link to={item.txLink} className="table-edit">Link</Link></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Card>
  </div>
)

export default UserActivity