import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchVotesForBillFromServer } from '../actions/ActionCreators'
import BillOverview from './BillOverview'
import ListVotes from './ListVotes'

/**
* @description Displays votes on a particular bill.
*/
export class BillDetails extends Component {
  static propTypes = {
    hasVotes: PropTypes.bool.isRequired,
    billId: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const {
      hasVotes,
      billId,
      fetchVotesForBillFromServer
    } = this.props
    if (!hasVotes) {
      fetchVotesForBillFromServer(billId)
    }
  }
  render() {
    const { billId, votes } = this.props
    return (
      <div>
        <BillOverview billId={billId}/>
        <ListVotes votes={votes}/>
      </div>
    )
  }
}

function mapStateToProps ({ bills, votes }, { match }) {
  const billId = match.params.bill_id
  const bill = bills.byId[billId]
  return {
    billId,
    votes: bill && bill.votes ? bill.votes : [],
    hasVotes: bill && bill.votes && bill.votes.length > 0 ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVotesForBillFromServer: billId => dispatch(fetchVotesForBillFromServer(billId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
