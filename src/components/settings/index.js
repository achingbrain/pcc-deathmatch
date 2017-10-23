import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Devices from './devices'
import Riders from './riders'
import Button from 'material-ui/Button'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog'
import Tabs, {
  Tab
} from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import withStyles from 'material-ui/styles/withStyles'
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui-icons/Settings'
import GAME_STATE from '../../constants/game-state'

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  }
}

const tabs = [
  Devices,
  Riders
]

class Settings extends Component {
  state = {
    tab: 0,
    open: false
  }

  showSettings = () => {
    this.setState({
      open: true
    })
  }

  hideSettings = () => {
    this.setState({
      open: false
    })
  }

  showDevices = () => {
    this.setState({
      tab: tabs.devices
    })
  }

  showRiders = () => {
    this.setState({
      tab: tabs.riders
    })
  }

  handleTabChange = (event, value) => {
    this.setState({
      tab: value
    })
  }

  render () {
    const { tab, open } = this.state
    const Panel = tabs[this.state.tab]

    return (
      <IconButton aria-label="Delete" onClick={this.showSettings}>
        <SettingsIcon />
        <Dialog open={this.state.open} onRequestClose={this.hideSettings}>
          <DialogTitle>SETTINGS</DialogTitle>
          <DialogContent>
            <Tabs value={this.state.tab} onChange={this.handleTabChange}>
              <Tab label='DEVICES' />
              <Tab label='RIDERS' />
            </Tabs>
            <Panel socket={this.props.socket} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.hideSettings}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </IconButton>
    )
  }
}

export default Settings
