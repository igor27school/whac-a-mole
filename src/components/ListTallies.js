import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTalliesFromServer } from '../actions/ActionCreators'
import TallySummary from './TallySummary'

/**
* @description Displays tallies as a list.
*/
export class ListTallies extends Component {
  static propTypes = {
    hasTallies: PropTypes.bool.isRequired,
    tallies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }
  componentDidMount() {
    const { hasTallies, fetchTalliesFromServer } = this.props
    if (!hasTallies) {
      fetchTalliesFromServer()
    }
  }
  render() {
    const { tallies } = this.props
    return (
      <div>
        <h2>BILLS</h2>
        <ul>
          {tallies.sort(function(b1, b2) {
            if (b1.date < b2.date){
              return 1
            }
            return -1
          }).map(tally => (
            <li key={tally._id}>
              <TallySummary tallyId={tally._id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ tallies }) {
  return {
    tallies: tallies.allIds.map(tally => tallies.byId[tally]),
    hasTallies: tallies.allIds.length > 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTalliesFromServer: () => dispatch(fetchTalliesFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTallies)
