import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchVotesForTallyFromServer } from '../actions/ActionCreators'
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
      hasVotes,
      tallyId,
      fetchVotesForTallyFromServer
    } = this.props
    if (!hasVotes) {
      fetchVotesForTallyFromServer(tallyId)
    }
  }
  render() {
    const { tallyId, votes } = this.props
    return (
      <div>
        <TallyOverview tallyId={tallyId}/>
        <ListVotes votes={votes}/>
      </div>
    )
  }
}

function mapStateToProps ({ tallies, votes }, { match }) {
  const tallyId = match.params.tally_id
  const tally = tallies.byId[tallyId]
  return {
    tallyId,
    votes: tally && tally.votes ? tally.votes : [],
    hasVotes: tally && tally.votes && tally.votes.length > 0 ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVotesForTallyFromServer: tallyId => dispatch(fetchVotesForTallyFromServer(tallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TallyDetails)
