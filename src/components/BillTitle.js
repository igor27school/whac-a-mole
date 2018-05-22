import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchBillFromServer } from '../actions/ActionCreators'

/**
* @description This component is used in VoteSummary view. It displays the bill title.
*/
export class BillTitle extends Component {
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
      <Link to={`/bill/${bill._id}`}>{bill.title}</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillTitle)
