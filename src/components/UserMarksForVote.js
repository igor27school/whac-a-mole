import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUserMarksForVoteFromServer } from '../actions/ActionCreators'

/**
* @description This component is used to show how users marked the consistency of senator's vote.
*/
export class UserMarksForVote extends Component {
  static propTypes = {
    voteId: PropTypes.string.isRequired,
    fetchUserMarksForVoteFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { voteId, hasMarks } = this.props
    if (!hasMarks) {
      this.props.fetchUserMarksForVoteFromServer(voteId)
    }
  }
  render() {
    const {upMarks, downMarks} = this.props
    return (
      <span>UPMARKS: {upMarks} DOWNMARKS: {downMarks}</span>
    )
  }
}

function mapStateToProps ({ votes }, { voteId }) {
  const vote = votes.byId[voteId]
  return {
    hasMarks: vote && vote.upMarks && vote.downMarks ? true : false,
    upMarks: vote && vote.upMarks ? vote.upMarks.length : 0,
    downMarks: vote && vote.downMarks ? vote.downMarks.length : 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserMarksForVoteFromServer: (voteId) => dispatch(fetchUserMarksForVoteFromServer(voteId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMarksForVote)
