import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTalliesForBillFromServer } from '../actions/ActionCreators'
import BillOverview from './BillOverview'
import ListTallies from './ListTallies'
import ListOppositeVotes from './ListOppositeVotes'

/**
* @description Displays all tallies for the bill.
*/
export class BillDetails extends Component {
  static propTypes = {
    hasTallies: PropTypes.bool.isRequired,
    billId: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const {
      hasTallies,
      billId,
      fetchTalliesForBillFromServer
    } = this.props
    if (!hasTallies) {
      fetchTalliesForBillFromServer(billId)
    }
  }
  render() {
    const { billId, bill, tallies } = this.props
    if (!bill) {
      return (
        <h4>The bill {billId} does not exist</h4>
      )
    }
    // TODO: refactor this logic
    if (tallies.length === 2) {
      return (
        <div>
          <BillOverview billId={billId}/>
          <ListTallies tallies={tallies}/>
          <ListOppositeVotes firstTallyId={tallies[0]} secondTallyId={tallies[1]}/>
        </div>
      )
    } else {
      return (
        <div>
          <BillOverview billId={billId}/>
          <ListTallies tallies={tallies}/>
        </div>
      )
    }

  }
}

function mapStateToProps ({ bills }, { match }) {
  const billId = match.params.bill_id
  const bill = bills.byId[billId]
  return {
    billId,
    bill,
    tallies: bill && bill.tallies ? bill.tallies : [],
    hasTallies: bill && bill.tallies && bill.tallies.length > 0 ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTalliesForBillFromServer: tallyId => dispatch(fetchTalliesForBillFromServer(tallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
