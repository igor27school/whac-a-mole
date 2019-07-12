import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchBillFromServer } from '../actions/ActionCreators'

/**
* @description Displays details of a particular bill.
*/
export class BillOverview extends Component {
  static propTypes = {
    hasBill: PropTypes.bool.isRequired,
    billId: PropTypes.string.isRequired,
    bill: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  }
  componentDidMount() {
    const {
      hasBill,
      billId,
      fetchBillFromServer,
    } = this.props
    if (!hasBill) {
      fetchBillFromServer(billId)
    }
  }
  render() {
    const { bill, billId, hasBill } = this.props
    if (!hasBill) {
      return (
        <h4>The bill {billId} does not exist</h4>
      )
    }
    return (
      <div>
        <h2>BILL: {bill.title}</h2>
        <h3>Bill link: <Link to={`${bill.link}`} target="_blank">{bill.link}</Link></h3>
      </div>
    )
  }
}

function mapStateToProps ({ bills }, { billId }) {
  const bill = bills.byId[billId]
  return {
    bill,
    billId,
    hasBill: bill && bill._id ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchBillFromServer: billId => dispatch(fetchBillFromServer(billId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillOverview)
