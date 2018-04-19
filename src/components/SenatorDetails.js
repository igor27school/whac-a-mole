import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchVotesForSenatorFromServer } from '../actions/ActionCreators'
import SenatorOverview from './SenatorOverview'
import ListVotes from './ListVotes'

/**
* @description Displays votes of a particular senator.
*/
export class SenatorDetails extends Component {
  static propTypes = {
    hasVotes: PropTypes.bool.isRequired,
    senatorId: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const {
      hasVotes,
      senatorId,
      fetchVotesForSenatorFromServer,
    } = this.props
    if (!hasVotes) {
      fetchVotesForSenatorFromServer(senatorId)
    }
  }
  render() {
    const { senatorId, votes } = this.props
    return (
      <div>
        <SenatorOverview senatorId={senatorId}/>
        <ListVotes votes={votes}/>
      </div>
    )
  }
}

function mapStateToProps ({ senators, votes }, { match }) {
  const senatorId = match.params.senator_id
  const senator = senators.byId[senatorId]
  return {
    senatorId,
    votes: senator && senator.votes ? senator.votes : [],
    hasVotes: senator && senator.votes && senator.votes.length > 0 ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchVotesForSenatorFromServer: senatorId => dispatch(fetchVotesForSenatorFromServer(senatorId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenatorDetails)
