import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchVotePairsFromServer } from '../actions/ActionCreators'
import { constructVoteComparisonKey } from '../utils/Utils'
import VoteDifference from './VoteDifference'

/**
* @description Compares votes of two Congressmen and only displays the bills where the votes were opposite.
*/
export class CompareVotes extends Component {
  static propTypes = {
    votePairs: PropTypes.arrayOf(
      PropTypes.shape({
        bill: PropTypes.string.isRequired,
        firstVote: PropTypes.string.isRequired,
        secondVote: PropTypes.string.isRequired,
      })
    ).isRequired,
  }
  componentDidMount() {
    const {
      hasVoteComparison,
      firstSenatorId,
      secondSenatorId,
      fetchVotePairsFromServer,
    } = this.props
    if (!hasVoteComparison) {
      fetchVotePairsFromServer(firstSenatorId, secondSenatorId)
    }
  }
  render() {
    return (
      <div>
        <h2>OPPOSING VOTES</h2>
        <ul>
          {this.props.votePairs.map(votePair => (
            <li key={votePair.bill}>
              <VoteDifference bill={votePair.bill} firstVoteId={votePair.firstVote} secondVoteId={votePair.secondVote}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ voteComparisons }, { match }) {
  const firstSenatorId = match.params.first_senator_id
  const secondSenatorId = match.params.second_senator_id
  const compKey = constructVoteComparisonKey(firstSenatorId, secondSenatorId)
  return {
    hasVoteComparison: compKey in voteComparisons.byId,
    firstSenatorId,
    secondSenatorId,
    votePairs: compKey in voteComparisons.byId ? voteComparisons.byId[compKey] : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVotePairsFromServer: (firstSenatorId, secondSenatorId) => dispatch(fetchVotePairsFromServer(firstSenatorId, secondSenatorId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareVotes)
