import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchSenatorFromServer } from '../actions/ActionCreators'

/**
* @description Displays detailed information about the senator.
*/
export class SenatorOverview extends Component {
  static propTypes = {
    hasSenator: PropTypes.bool.isRequired,
    senatorId: PropTypes.string.isRequired,
    senator: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      state: PropTypes.string,
      link: PropTypes.string,
      url: PropTypes.url,
    }),
  }
  componentDidMount() {
    const {
      hasSenator,
      senatorId,
      fetchSenatorFromServer,
    } = this.props
    if (!hasSenator) {
      fetchSenatorFromServer(senatorId)
    }
  }
  render() {
    const { senator, senatorId } = this.props
    if (!senator) {
      return (
        <h4>The senator {senatorId} does not exist</h4>
      )
    }
    return (
      <div>
        <h2>SENATOR: {senator.name}</h2>
        <h3>Representing state {senator.state}</h3>
        <h3>Senator link: <Link to={`${senator.link}`} target="_blank">{senator.link}</Link></h3>
      </div>
    )
  }
}

function mapStateToProps ({ senators, votes }, { senatorId }) {
  const senator = senators.byId[senatorId]
  return {
    senator,
    senatorId,
    hasSenator: senators.allIds.length > 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchSenatorFromServer: senatorId => dispatch(fetchSenatorFromServer(senatorId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenatorOverview)
