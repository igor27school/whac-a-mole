import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MARK_UP, MARK_DOWN } from '../constants/MarkTypes'
import { mark } from '../actions/ActionCreators'

/**
* @description This component is used to vote on consistency of senator's vote.
*/
export class Marker extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    mark: PropTypes.func.isRequired,
  }
  render() {
    const {id, mark} = this.props
    const userId = JSON.parse(sessionStorage.getItem('user')).userId
    if (!userId) {
      return (<span>Please login to vote</span>)
    }
    return (
      <span>
        <button onClick={(event) => mark(id, userId, MARK_UP)}>UPMARK</button>
        <button onClick={(event) => mark(id, userId, MARK_DOWN)}>DOWNMARK</button>
      </span>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mark: (voteId, userId, markType) => dispatch(mark(voteId, userId, markType)),
  }
}

export default connect(null, mapDispatchToProps)(Marker)
