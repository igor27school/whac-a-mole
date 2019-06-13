import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUserVotesForVote } from '../actions/ActionCreators'

/**
* @description This component is used to show how users voted on consistency of senator's vote.
*/
export class UserVotesForVote extends Component {
  static propTypes = {
    voteId: PropTypes.string.isRequired,
    fetchUserVotesForVote: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { voteId, hasVotes } = this.props
    if (!hasVotes) {
      this.props.fetchUserVotesForVote(voteId)
    }
  }
  render() {
    const {upVotes, downVotes} = this.props
    return (
      <span>UPVOTES: {upVotes} DOWNVOTES: {downVotes}</span>
    )
  }
}

function mapStateToProps ({ votes }, { voteId }) {
  const vote = votes.byId[voteId]
  return {
    hasVotes: vote && vote.upVotes && vote.downVotes ? true : false,
    upVotes: vote && vote.upVotes ? vote.upVotes.length : 0,
    downVotes: vote && vote.downVotes ? vote.downVotes.length : 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserVotesForVote: (voteId) => dispatch(fetchUserVotesForVote(voteId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVotesForVote)
