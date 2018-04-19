import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VoteSummary from './VoteSummary'

/**
* @description Displays votes on a particular bill.
*/
export class ListVotes extends Component {
  static propTypes = {
    votes: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }
  render() {
    return (
      <div>
        <h2>VOTES</h2>
        <ul>
          {this.props.votes.map(voteId => (
            <li key={voteId}>
              <VoteSummary voteId={voteId}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListVotes
