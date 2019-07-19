import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchSenatorsFromServer, fetchVotesForTallyFromServer } from '../actions/ActionCreators'
import TallyOverview from './TallyOverview'
import ListVotes from './ListVotes'

/**
* @description Displays all votes during a particular voting session on an issue.
*/
export class TallyDetails extends Component {
  static propTypes = {
    hasVotes: PropTypes.bool.isRequired,
    tallyId: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const {
      hasSenators,
      hasVotes,
      tallyId,
      fetchSenatorsFromServer,
      fetchVotesForTallyFromServer
    } = this.props
    if (!hasSenators) {
      fetchSenatorsFromServer()
    }
    if (!hasVotes) {
      fetchVotesForTallyFromServer(tallyId)
    }
  }
  render() {
    const { tallyId, tally, votes } = this.props
    if (!tally) {
      return (
        <h4>The tally {tallyId} does not exist</h4>
      )
    }
    return (
      <div>
        <TallyOverview tallyId={tallyId}/>
        <ListVotes votes={votes}/>
      </div>
    )
  }
}

function mapStateToProps ({ senators, tallies, votes }, { match }) {
  const tallyId = match.params.tally_id
  const tally = tallies.byId[tallyId]
  return {
    hasSenators: senators.allIds.length > 0 ? true : false,
    tallyId,
    tally,
    votes: tally && tally.votes ? tally.votes : [],
    hasVotes: tally && tally.votes && tally.votes.length > 0 ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchSenatorsFromServer: () => dispatch(fetchSenatorsFromServer()),
    fetchVotesForTallyFromServer: tallyId => dispatch(fetchVotesForTallyFromServer(tallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TallyDetails)
