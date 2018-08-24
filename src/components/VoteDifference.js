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
export class VoteDifference extends Component {
  static propTypes = {
    bill: PropTypes.string.isRequired,
    hasFirstVote: PropTypes.bool.isRequired,
    firstVoteId: PropTypes.string.isRequired,
    firstVote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rep: PropTypes.string.isRequired,
      bill: PropTypes.string.isRequired,
      outcome: PropTypes.string.isRequired
    }),
    hasSecondVote: PropTypes.bool.isRequired,
    secondVoteId: PropTypes.string.isRequired,
    secondVote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rep: PropTypes.string.isRequired,
      bill: PropTypes.string.isRequired,
      outcome: PropTypes.string.isRequired
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
    const { bill, firstVote, firstVoteId, secondVote, secondVoteId } = this.props
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
        On <BillTitle billId={bill}/>
        <SenatorNickname senatorId={firstVote.rep}/> voted {firstVote.outcome}(<Link to={`/vote/${firstVote._id}`}>details</Link>), but <SenatorNickname senatorId={secondVote.rep}/> voted {secondVote.outcome}(<Link to={`/vote/${secondVote._id}`}>details</Link>)
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
    fetchVoteFromServer: (billId) => dispatch(fetchVoteFromServer(billId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteDifference)
