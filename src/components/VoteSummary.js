import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchVoteFromServer } from '../actions/ActionCreators'
import TallyTitle from './TallyTitle'
import SenatorNickname from './SenatorNickname'
import UserMarksForVote from './UserMarksForVote'

/**
* @description This component displays the information releavant to a particular vote.
*/
export class VoteSummary extends Component {
  static propTypes = {
    hasVote: PropTypes.bool.isRequired,
    voteId: PropTypes.string.isRequired,
    vote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rep: PropTypes.string.isRequired,
      tally: PropTypes.string.isRequired,
      outcome: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
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
        <SenatorNickname senatorId={vote.rep}/> voted {vote.outcome} on <TallyTitle tallyId={vote.tally}/><UserMarksForVote voteId={voteId}/>
        (<Link to={`${vote.url}`}>Details about the vote</Link>)
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
    fetchVoteFromServer: (tallyId) => dispatch(fetchVoteFromServer(tallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteSummary)
