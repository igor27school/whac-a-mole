import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchBillFromServer } from '../actions/ActionCreators'

/**
* @description This component is used in ListBills view. It displays the information releavant to a particular bill.
*/
export class BillSummary extends Component {
  static propTypes = {
    hasBills: PropTypes.bool.isRequired,
    bill: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
    billId: PropTypes.string.isRequired,
    fetchBillFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { hasBills, billId } = this.props
    if (!hasBills) {
      this.props.fetchBillFromServer(billId)
    }
  }
  render() {
    const { bill, billId } = this.props
    if (!bill){
      return (
        <div>Invalid bill id: {billId}</div>
      )
    }
    return (
      <div>
        <Link to={`/bill/${bill._id}`}>{bill.title}</Link>
      </div>
    )
  }
}

function mapStateToProps ({ bills }, { billId }) {
  return {
    bill: bills.byId[billId],
    billId,
    hasBills: billId in bills.byId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchBillFromServer: (billId) => dispatch(fetchBillFromServer(billId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillSummary)
