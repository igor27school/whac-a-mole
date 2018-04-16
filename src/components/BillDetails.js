import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBillFromServer, fetchVotesForBillFromServer } from '../actions/ActionCreators'
import VoteSummary from './VoteSummary'

/**
* @description Displays bills as a list.
*/
export class BillDetails extends Component {
  static propTypes = {
    hasBills: PropTypes.bool.isRequired,
    hasVotes: PropTypes.bool.isRequired,
    billId: PropTypes.string.isRequired,
    bill: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }
  componentDidMount() {
    const {
      hasBills,
      hasVotes,
      billId,
      fetchBillFromServer,
      fetchVotesForBillFromServer,
    } = this.props
    if (!hasBills) {
      fetchBillFromServer().then(bills => {
        // Don't fetch votes if the bill is invalid
        if (bills.filter(bill => bill.id === billId).length > 0) {
          fetchVotesForBillFromServer(billId)
        }
      })
    } else if (hasBills && !hasVotes) {
      fetchVotesForBillFromServer(billId)
    }
  }
  render() {
    const { bill, billId, votes } = this.props
    if (!bill) {
      return (
        <h4>The bill {billId} does not exist</h4>
      )
    }
    return (
      <div>
        <h2>BILL: {bill.title}</h2>
        <h2>VOTES</h2>
        <ul>
          {votes.map(vote => (
            <li key={vote.id}>
              <VoteSummary voteId={vote.id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ bills, votes }, {match}) {
  const billId = match.params.bill_id
  const bill = bills.byId[billId]
  return {
    bill,
    billId,
    votes: bill && bill.votes ? bill.votes.map(voteId => votes.byId[voteId]) : [],
    hasBills: bills.allIds.length > 0,
    hasVotes: bill && bill.votes && bill.votes.length > 0 ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchBillFromServer: billId => dispatch(fetchBillFromServer(billId)),
    fetchVotesForBillFromServer: billId => dispatch(fetchVotesForBillFromServer(billId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
