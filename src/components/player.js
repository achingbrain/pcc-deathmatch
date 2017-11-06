import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Layer, Rect, Stage, Group, Text, Image, Sprite } from 'react-konva'
import { addAnimateable, removeAnimateable } from './animator'
import GAME_STATE from '../constants/game-state'
import rangeMap from 'range-map'
import assets from '../css/assets'
import frames from '../utils/frames'

const PlayerName = styled.div`
  background-color: #FFF;
  padding: 5px 10px;
  margin: 0;
  font-size: 16px;
  display: inline-block;
`

export const SPRITE_WIDTH = 500
export const SPRITE_HEIGHT = 400
export const NAME_SIZE = 24
export const UPDATE_FREQUENCY_MS = 1000

const ANIMATION_FRAMES = {
  'riding': 8
}

class Player extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired,
    gameState: PropTypes.string.isRequired,
    xOffset: PropTypes.number.isRequired,
    yOffset: PropTypes.number.isRequired,
    sprite: PropTypes.string.isRequired
  }

  state = {
    animation: 'riding',
    x: 0,
    nextX: 0,
    lastX: 0,
    startXTime: 0
  }

  componentDidMount() {
    this.setState({
      x: 0 - SPRITE_WIDTH
    })

    addAnimateable(this.animate)
  }

  componentWillUnmount = () => {
    removeAnimateable(this.animate)
  }

  componentWillReceiveProps (nextProps) {
    this.setState(s => ({
      lastX: s.nextX,
      nextX: this.props.player.x,
      startXTime: Date.now()
    }))
  }

  animate = () => {
    if (this.props.gameState === GAME_STATE.countingDown) {
      return this.setState(s => {
        return {
          x: s.x + 2
        }
      })
    }

    if (this.props.gameState === GAME_STATE.finishing) {
      return this.setState(s => {
        return {
          //animation: 'lunge',
          x: s.x + 10
        }
      })
    }

    const through = Date.now() - this.state.startXTime

    this.setState(s => {
      return {
        animation: 'riding',
        x: rangeMap(through > UPDATE_FREQUENCY_MS ? UPDATE_FREQUENCY_MS : through, 0, UPDATE_FREQUENCY_MS, this.state.lastX, this.state.nextX)
      }
    })
  }

  setSprite = (sprite) => {
    this.sprite = sprite

    if (this.sprite && !this.sprite.isRunning()) {
      this.sprite.start()
    }
  }

  render () {
    const rps = this.props.player.cadence / 60
    const fps = parseInt(rps * ANIMATION_FRAMES[this.state.animation], 10)

    return (
      <Group>
        <Text
          text={this.props.player.name}
          x={this.state.x + this.props.xOffset}
          y={this.props.yOffset}
          fill='black'
          fontFamily='"Press Start 2P", monospace'
          fontSize={NAME_SIZE}
          shadowColor='white'
          shadowOffsetX={0}
          shadowOffsetY={3}
          shadowBlur={0}
        />
        <Sprite
          ref={this.setSprite}
          image={assets.get(this.props.sprite)}
          x={this.state.x}
          y={this.props.yOffset + NAME_SIZE}
          width={SPRITE_WIDTH}
          height={SPRITE_HEIGHT}
          animation={this.state.animation}
          animations={{
            riding: frames(SPRITE_WIDTH, SPRITE_HEIGHT, 0, 8)
          }}
          frameRate={fps}
          frameIndex={this.sprite && this.sprite.frameIndex() || 0}
        />
      </Group>
    )
  }
}

const mapStateToProps = ({ game: { state } }) => ({
  gameState: state
})

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
