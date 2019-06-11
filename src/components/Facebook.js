import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { receiveUserInfo } from '../actions/ActionCreators'

export class Facebook extends Component {

  responseFacebook = response => {
    const user = {
      userId: response.userID,
      name: response.name,
      picture: response.picture.data.url
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    this.props.receiveUserInfo(user)
  }

  componentClicked = () => console.log('clicked')

  render() {
    const { user } = this.props
    let fbContent

    if (user) {
      fbContent = (
        <div style={{
          width: '400px',
          margin: 'auto',
          background: '#f4f4f4',
          padding: '20px'
        }}>
          <img src={user.picture} alt={user.name} />
          <h2>Welcome {user.name}</h2>
        </div>
      )
    } else {
      fbContent = (<FacebookLogin
        appId="1618308788494497"
        autoLoad={true}
        fields="name,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
    }

    return <div>{fbContent}</div>
  }
}

function mapStateToProps () {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return {
    user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receiveUserInfo: (user) => dispatch(receiveUserInfo(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook)
