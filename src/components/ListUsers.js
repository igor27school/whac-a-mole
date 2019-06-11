import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUsersFromServer } from '../actions/ActionCreators'

/**
* @description Displays users as a list.
*/
export class ListUsers extends Component {
  static propTypes = {
    hasUsers: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }
  componentDidMount() {
    const { hasUsers, fetchUsersFromServer } = this.props
    if (!hasUsers) {
      fetchUsersFromServer()
    }
  }
  render() {
    const { users } = this.props
    return (
      <div>
        <h2>USERS</h2>
        <ul>
          {users.sort(function(u1, u2) {
            if (u1.name > u2.name){
              return 1
            }
            return -1
          }).map(user => (
            <li key={user._id}>
              <div style={{
                width: '400px',
                margin: 'auto',
                background: '#f4f4f4',
                padding: '20px'
              }}>
                <img src={user.picture} alt={user.name} />{user.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users: users.allIds.map(user => users.byId[user]),
    hasUsers: users.allIds.length > 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUsersFromServer: () => dispatch(fetchUsersFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers)
