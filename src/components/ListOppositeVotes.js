import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchSenatorsWithOppositeVotesFromServer } from '../actions/ActionCreators'
import { constructTalliesComparisonKey } from '../utils/Utils'
import OppositeVote from './OppositeVote'

/**
* @description Compares two votes of all Congressmen on the same bill and only displays the Congressmen whose votes were opposite.
*/
export class ListOppositeVotes extends Component {
  static propTypes = {
    oppositeVotes: PropTypes.arrayOf(
      PropTypes.shape({
        senator: PropTypes.string.isRequired,
        firstVote: PropTypes.string.isRequired,
        secondVote: PropTypes.string.isRequired,
      })
    ).isRequired,
  }
  componentDidMount() {
    const {
      hasOppositeVotes,
      firstTallyId,
      secondTallyId,
      fetchSenatorsWithOppositeVotesFromServer,
    } = this.props
    if (!hasOppositeVotes) {
      fetchSenatorsWithOppositeVotesFromServer(firstTallyId, secondTallyId)
    }
  }
  render() {
    if (!this.props.oppositeVotes.length > 0) {
      return (
        <h2>Did not find senators with opposite votes for this bill</h2>
      )
    }
    return (
      <div>
        <h2>SENATORS WITH OPPOSITE VOTES</h2>
        <ul>
          {this.props.oppositeVotes.map(oppositeVote => (
            <li key={oppositeVote.senator}>
              <OppositeVote senatorId={oppositeVote.senator} firstVoteId={oppositeVote.firstVote} secondVoteId={oppositeVote.secondVote}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ oppositeVotes }, { firstTallyId, secondTallyId }) {
  let compKey = constructTalliesComparisonKey(firstTallyId, secondTallyId)
  // Somehow, the order of passed tallyIds gets changed after reloading
  if (!(compKey in oppositeVotes.byId)) {
    compKey = constructTalliesComparisonKey(secondTallyId, firstTallyId)
  }
  return {
    hasOppositeVotes: compKey in oppositeVotes.byId,
    firstTallyId,
    secondTallyId,
    oppositeVotes: compKey in oppositeVotes.byId ? oppositeVotes.byId[compKey] : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchSenatorsWithOppositeVotesFromServer: (firstTallyId, secondTallyId) => dispatch(fetchSenatorsWithOppositeVotesFromServer(firstTallyId, secondTallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOppositeVotes)
