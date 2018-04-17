import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchSenatorFromServer, fetchVotesForSenatorFromServer } from '../actions/ActionCreators'
import VoteSummary from './VoteSummary'

/**
* @description Displays votes of a particualr senator.
*/
export class SenatorDetails extends Component {
  static propTypes = {
    hasSenators: PropTypes.bool.isRequired,
    hasVotes: PropTypes.bool.isRequired,
    senatorId: PropTypes.string.isRequired,
    senator: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }
  componentDidMount() {
    const {
      hasSenators,
      hasVotes,
      senatorId,
      fetchSenatorFromServer,
      fetchVotesForSenatorFromServer,
    } = this.props
    if (!hasSenators) {
      fetchSenatorFromServer().then(senators => {
        // Don't fetch votes if the senator is invalid
        if (senators.filter(senator => senator.id === senatorId).length > 0) {
          fetchVotesForSenatorFromServer(senatorId)
        }
      })
    } else if (hasSenators && !hasVotes) {
      fetchVotesForSenatorFromServer(senatorId)
    }
  }
  render() {
    const { senator, senatorId, votes } = this.props
    if (!senator) {
      return (
        <h4>The senator {senatorId} does not exist</h4>
      )
    }
    return (
      <div>
        <h2>SENATOR: {senator.name}</h2>
        <h2>VOTES</h2>
        <ul>
          {votes.map(voteId => (
            <li key={voteId}>
              <VoteSummary voteId={voteId}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ senators, votes }, {match}) {
  const senatorId = match.params.senator_id
  const senator = senators.byId[senatorId]
  return {
    senator,
    senatorId,
    votes: senator && senator.votes ? senator.votes : [],
    hasSenators: senators.allIds.length > 0,
    hasVotes: senator && senator.votes && senator.votes.length > 0 ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchSenatorFromServer: senatorId => dispatch(fetchSenatorFromServer(senatorId)),
    fetchVotesForSenatorFromServer: senatorId => dispatch(fetchVotesForSenatorFromServer(senatorId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenatorDetails)
