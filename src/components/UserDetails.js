import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchVotesForUserFromServer } from '../actions/ActionCreators'
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
      fetchVotesForUserFromServer,
    } = this.props
    if (!hasVotes) {
      fetchVotesForUserFromServer(userId)
    }
  }
  render() {
    const { userId, upVotes, downVotes } = this.props
    return (
      <div>
        <UserOverview userId={userId}/>
        <h2>DEEMED CONSISTENT</h2>
        <ListVotes votes={upVotes}/>
        <h2>DEEMED INCONSISTENT</h2>
        <ListVotes votes={downVotes}/>
      </div>
    )
  }
}

function mapStateToProps ({ users }, { match }) {
  const userId = match.params.user_id
  const user = users.byId[userId]
  return {
    userId,
    hasVotes: user && user.upVotes && user.downVotes ? true : false,
    upVotes: user && user.upVotes ? user.upVotes : [],
    downVotes: user && user.downVotes ? user.downVotes : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVotesForUserFromServer: userId => dispatch(fetchVotesForUserFromServer(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
