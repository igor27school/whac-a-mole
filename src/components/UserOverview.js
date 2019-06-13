import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUserFromServer } from '../actions/ActionCreators'

/**
* @description Displays information of a particular user.
*/
export class UserOverview extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  }
  componentDidMount() {
    const {
      user,
      userId,
      fetchUserFromServer,
    } = this.props
    if (!user) {
      fetchUserFromServer(userId)
    }
  }
  render() {
    const { user, userId } = this.props
    if (!user) {
      return (
        <h4>The user {userId} does not exist</h4>
      )
    }
    return (
      <div>
        <img src={user.picture} alt={user.name} />{user.name}
      </div>
    )
  }
}

function mapStateToProps ({ users }, { userId }) {
  const user = users.byId[userId]
  return {
    user,
    userId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserFromServer: userId => dispatch(fetchUserFromServer(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview)
