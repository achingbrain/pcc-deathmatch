import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { setAdminToken } from '../../store/actions'

class Authenticate extends Component {
  state = {
    password: ''
  }

  componentDidMount () {
    this.setState({
      password: this.props.authToken
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })

    this.props.setAdminToken(event.target.value)
  }

  render () {
    return (
      <div>
       <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={this.handleChange('password')}
          value={this.state.password}
        />
      </div>
    )
  }
}

Authenticate.propTypes = {
  authToken: PropTypes.string
}

const mapStateToProps = ({ admin: { token } }) => ({
  authToken: token
})

const mapDispatchToProps = {
  setAdminToken
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authenticate)
