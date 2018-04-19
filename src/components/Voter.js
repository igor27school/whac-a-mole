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
    return (
      <span>
        <button onClick={(event) => vote(id, VOTE_UP)}>UPVOTE</button>
        <button onClick={(event) => vote(id, VOTE_DOWN)}>DOWNVOTE</button>
      </span>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    vote: (id, voteType) => dispatch(vote(id, voteType)),
  }
}

export default connect(null, mapDispatchToProps)(Voter)
