import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { VOTE_UP, VOTE_DOWN } from '../constants/VoteTypes'
import { vote } from '../actions/ActionCreators'

/**
* @description This component is used to vote on consistency of senator's vote.
*/
export class Voter extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    vote: PropTypes.func.isRequired,
  }
  render() {
    const {id, vote} = this.props
    const userId = JSON.parse(sessionStorage.getItem('user')).userId
    return (
      <span>
        <button onClick={(event) => vote(id, userId, VOTE_UP)}>UPVOTE</button>
        <button onClick={(event) => vote(id, userId, VOTE_DOWN)}>DOWNVOTE</button>
      </span>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    vote: (voteId, userId, voteType) => dispatch(vote(voteId, userId, voteType)),
  }
}

export default connect(null, mapDispatchToProps)(Voter)
