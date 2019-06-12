import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchSenatorFromServer } from '../actions/ActionCreators'

/**
* @description This component is used in VoteSummary view. It displays the senator's unique nickname.
*/
export class SenatorNickname extends Component {
  static propTypes = {
    hasSenators: PropTypes.bool.isRequired,
    senator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    senatorId: PropTypes.string.isRequired,
    fetchSenatorFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { hasSenators, senatorId } = this.props
    if (!hasSenators) {
      this.props.fetchSenatorFromServer(senatorId)
    }
  }
  render() {
    const { senator, senatorId } = this.props
    if (!senator){
      return (
        <div>Invalid senator id: {senatorId}</div>
      )
    }
    return (
      <Link to={`${senator.url}`}>{senator.name} ({senator._id})</Link>
    )
  }
}

function mapStateToProps ({ senators }, { senatorId }) {
  return {
    senator: senators.byId[senatorId],
    senatorId,
    hasSenators: senatorId in senators.byId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchSenatorFromServer: (senatorId) => dispatch(fetchSenatorFromServer(senatorId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenatorNickname)
