import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import BluetoothState from './bluetooth-state'
import Settings from './settings'
import Authenticate from './authenticate'
import GAME_STATE from '../constants/game-state'

const toolbar = ({demo, gameState}) => {
  if (demo) {
    return null
  }

  if (
    gameState === GAME_STATE.intro ||
    gameState === GAME_STATE.riders
  ) {
    return (
      <div>
        {/* <AppBar position="static">
          <Toolbar> */}
        <BluetoothState />
        <Settings />
        <Authenticate />
        {/* </Toolbar>
        </AppBar> */}
      </div>
    )
  }

  return null
}

const mapStateToProps = ({ game: { demo, state } }) => ({
  demo,
  gameState: state
})

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toolbar)
