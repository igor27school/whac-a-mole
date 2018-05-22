import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchVoteFromServer } from '../actions/ActionCreators'
import BillTitle from './BillTitle'
import SenatorNickname from './SenatorNickname'

/**
* @description This component is used in BillDetails view. It displays the information releavant to a particular vote.
*/
export class VoteSummary extends Component {
  static propTypes = {
    hasVote: PropTypes.bool.isRequired,
    voteId: PropTypes.string.isRequired,
    vote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rep: PropTypes.string.isRequired,
      bill: PropTypes.string.isRequired,
      outcome: PropTypes.string.isRequired
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
        <SenatorNickname senatorId={vote.rep}/> voted {vote.outcome} on <BillTitle billId={vote.bill}/>
        (<Link to={`/vote/${vote._id}`}>Details about the vote</Link>)
      </div>
    )
  }
}

function mapStateToProps ({ votes }, { voteId }) {
  return {
    vote: votes.byId[voteId],
    hasVote: voteId in votes.byId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVoteFromServer: (billId) => dispatch(fetchVoteFromServer(billId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteSummary)
