import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchMarksForUserFromServer } from '../actions/ActionCreators'
import UserOverview from './UserOverview'
import ListVotes from './ListVotes'

/**
* @description Displays information of a particular user.
*/
export class UserDetails extends Component {
  static propTypes = {
    hasVotes: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const {
      hasVotes,
      userId,
      fetchMarksForUserFromServer,
    } = this.props
    if (!hasVotes) {
      fetchMarksForUserFromServer(userId)
    }
  }
  render() {
    const { userId, upMarks, downMarks } = this.props
    return (
      <div>
        <UserOverview userId={userId}/>
        <h2>DEEMED CONSISTENT</h2>
        <ListVotes votes={upMarks}/>
        <h2>DEEMED INCONSISTENT</h2>
        <ListVotes votes={downMarks}/>
      </div>
    )
  }
}

function mapStateToProps ({ users }, { match }) {
  const userId = match.params.user_id
  const user = users.byId[userId]
  return {
    userId,
    hasMarks: user && user.upMarks && user.downMarks ? true : false,
    upMarks: user && user.upMarks ? user.upMarks : [],
    downMarks: user && user.downMarks ? user.downMarks : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMarksForUserFromServer: userId => dispatch(fetchMarksForUserFromServer(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
