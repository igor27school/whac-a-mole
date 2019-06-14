import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchTallyFromServer } from '../actions/ActionCreators'

/**
* @description Displays details of a particular tally.
*/
export class TallyOverview extends Component {
  static propTypes = {
    hasTally: PropTypes.bool.isRequired,
    tallyId: PropTypes.string.isRequired,
    tally: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  }
  componentDidMount() {
    const {
      hasTally,
      tallyId,
      fetchTallyFromServer,
    } = this.props
    if (!hasTally) {
      fetchTallyFromServer(tallyId)
    }
  }
  render() {
    const { tally, tallyId } = this.props
    if (!tally) {
      return (
        <h4>The tally {tallyId} does not exist</h4>
      )
    }
    return (
      <div>
        <h2>BILL: {tally.title}</h2>
        <h3>Date: {tally.formattedDate}</h3>
        <h3>Description: {tally.summary}</h3>
        <h3>Bill link: <Link to={`${tally.link}`} target="_blank">{tally.link}</Link></h3>
      </div>
    )
  }
}

function mapStateToProps ({ tallies }, { tallyId }) {
  const tally = tallies.byId[tallyId]
  return {
    tally,
    tallyId,
    hasTally: tallies.allIds.length > 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTallyFromServer: tallyId => dispatch(fetchTallyFromServer(tallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TallyOverview)
