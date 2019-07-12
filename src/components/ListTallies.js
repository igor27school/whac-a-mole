import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TallySummary from './TallySummary'

/**
* @description Displays tallies as a list.
*/
export class ListTallies extends Component {
  static propTypes = {
    tallies: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }
  render() {
    const { tallies } = this.props
    return (
      <div>
        <h2>TALLIES</h2>
        <ul>
          {tallies.sort(function(b1, b2) {
            if (b1.date < b2.date){
              return 1
            }
            return -1
          }).map(tallyId => (
            <li key={tallyId}>
              <TallySummary tallyId={tallyId}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListTallies
