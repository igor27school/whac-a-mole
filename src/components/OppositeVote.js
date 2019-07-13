import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchVoteFromServer } from '../actions/ActionCreators'
import SenatorNickname from './SenatorNickname'

/**
* @description This component is used in to display the opposite votes by one Congressman on the same bill.
*/
export class OppositeVote extends Component {
  static propTypes = {
    senatorId: PropTypes.string.isRequired,
    hasFirstVote: PropTypes.bool.isRequired,
    firstVoteId: PropTypes.string.isRequired,
    firstVote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rep: PropTypes.string.isRequired,
      tally: PropTypes.string.isRequired,
      outcome: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    hasSecondVote: PropTypes.bool.isRequired,
    secondVoteId: PropTypes.string.isRequired,
    secondVote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rep: PropTypes.string.isRequired,
      tally: PropTypes.string.isRequired,
      outcome: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    fetchVoteFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { hasFirstVote, firstVoteId, hasSecondVote, secondVoteId, fetchVoteFromServer } = this.props
    if (!hasFirstVote) {
      fetchVoteFromServer(firstVoteId)
    }
    if (!hasSecondVote) {
      fetchVoteFromServer(secondVoteId)
    }
  }
  render() {
    const { senatorId, firstVote, firstVoteId, secondVote, secondVoteId } = this.props
    if (!firstVote){
      return (
        <div>Invalid first vote id: {firstVoteId}</div>
      )
    }
    if (!secondVote){
      return (
        <div>Invalid second vote id: {secondVoteId}</div>
      )
    }
    return (
      <div>
        <SenatorNickname senatorId={senatorId}/> voted {firstVote.outcome}(<Link to={firstVote.url}>details</Link>), and voted {secondVote.outcome}(<Link to={secondVote.url}>details</Link>)
      </div>
    )
  }
}

function mapStateToProps ({ votes }, { firstVoteId, secondVoteId }) {
  return {
    firstVote: votes.byId[firstVoteId],
    hasFirstVote: firstVoteId in votes.byId,
    secondVote: votes.byId[secondVoteId],
    hasSecondVote: secondVoteId in votes.byId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVoteFromServer: (voteId) => dispatch(fetchVoteFromServer(voteId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OppositeVote)
