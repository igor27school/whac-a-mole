import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchVoteFromServer } from '../actions/ActionCreators'
import BillOverview from './BillOverview'
import SenatorOverview from './SenatorOverview'
import Voter from './Voter'

/**
* @description This component displays all the information releavant to a particular vote.
*/
export class VoteDetails extends Component {
  static propTypes = {
    hasVote: PropTypes.bool.isRequired,
    voteId: PropTypes.string.isRequired,
    vote: PropTypes.shape({
      id: PropTypes.string.isRequired,
      billId: PropTypes.string.isRequired,
      senatorId: PropTypes.string.isRequired,
      resultVote: PropTypes.string.isRequired,
      down: PropTypes.number.isRequired,
      up: PropTypes.number.isRequired,
    }),
    fetchVoteFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { hasVote, voteId } = this.props
    if (!hasVote) {
      this.props.fetchVoteFromServer(voteId)
    }
  }
  render() {
    const { vote, voteId } = this.props
    if (!vote){
      return (
        <div>Invalid vote id: {voteId}</div>
      )
    }
    return (
      <div>
        <SenatorOverview senatorId={vote.senatorId}/>
        <BillOverview billId={vote.billId}/>
        <h5>The vote on record is {vote.resultVote}</h5>
        <label><input name="agreement" type="checkbox"/>I have carefully studied the evidence and have come to my decision</label>
        <Voter id={vote.id}/>
      </div>
    )
  }
}

function mapStateToProps ({ votes }, { match }) {
  const voteId=match.params.vote_id
  return {
    vote: votes.byId[voteId],
    voteId,
    hasVote: voteId in votes.byId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVoteFromServer: (billId) => dispatch(fetchVoteFromServer(billId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteDetails)
