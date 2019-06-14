import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchTallyFromServer } from '../actions/ActionCreators'

/**
* @description This component is used in ListTallies view. It displays the information releavant to a particular tally.
*/
export class TallySummary extends Component {
  static propTypes = {
    hasTallies: PropTypes.bool.isRequired,
    tally: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    tallyId: PropTypes.string.isRequired,
    fetchTallyFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { hasTallies, tallyId } = this.props
    if (!hasTallies) {
      this.props.fetchTallyFromServer(tallyId)
    }
  }
  render() {
    const { tally, tallyId } = this.props
    if (!tally){
      return (
        <div>Invalid tally id: {tallyId}</div>
      )
    }
    return (
      <div>
        <Link to={`${tally.url}`}>{tally.title} ({tally.formattedDate})</Link>
      </div>
    )
  }
}

function mapStateToProps ({ tallies }, { tallyId }) {
  return {
    tally: tallies.byId[tallyId],
    tallyId,
    hasTallies: tallyId in tallies.byId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTallyFromServer: (tallyId) => dispatch(fetchTallyFromServer(tallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TallySummary)
