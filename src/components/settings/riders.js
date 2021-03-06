import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socket from '../../socket'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Table, {
  TableBody,
  TableCell,
  TableRow
} from 'material-ui/Table'
import PersonAddIcon from 'material-ui-icons/PersonAdd'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import EditRider from './edit-rider'

class Riders extends Component {
  static propTypes = {
    adminToken: PropTypes.string.isRequired,
    riders: PropTypes.array.isRequired
  }

  state = {
    addingRider: false,
    editingRider: false
  }

  addRider = () => {
    this.setState({
      addingRider: true,
      editingRider: false
    })
  }

  saveRider = (rider) => {
    if (this.state.editingRider) {
      socket.emit('admin:riders:update', this.props.adminToken, {
        id: this.state.editingRider,
        name: rider.name,
        age: rider.age,
        weight: rider.weight,
        height: rider.height,
        gender: rider.gender,
        photoSelect: rider.photoSelect,
        photoWin: rider.photoWin,
        photoLose: rider.photoLose,
        photoPower: rider.photoPower
      })
    } else {
      socket.emit('admin:riders:create', this.props.adminToken, {
        name: rider.name,
        age: rider.age,
        weight: rider.weight,
        height: rider.height,
        gender: rider.gender,
        photoSelect: rider.photoSelect,
        photoWin: rider.photoWin,
        photoLose: rider.photoLose,
        photoPower: rider.photoPower
      })
    }

    this.setState({
      addingRider: false,
      editingRider: false
    })
  }

  deleteRider = (rider) => () => {
    if (confirm('Do you really want to delete this rider?')) {
      socket.emit('admin:riders:delete', this.props.adminToken, rider)
    }
  }

  hideAddRider = () => {
    this.setState({
      addingRider: false,
      editingRider: false
    })
  }

  editRider = (rider) => () => {
    this.setState({
      addingRider: false,
      editingRider: rider.id
    })
  }

  hideEditRider = () => {
    this.setState({
      addingRider: false,
      editingRider: false
    })
  }

  render () {
    const riders = this.props.riders.sort((a, b) => a.name - b.name)

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Add rider" onClick={this.addRider}>
              <PersonAddIcon />
              <EditRider
                open={this.state.addingRider}
                onSave={this.saveRider}
                onCancel={this.hideAddRider}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Table>
          <TableBody>
            {riders.map(rider => {
              return (
                <TableRow
                key={rider.id}
              >
                <TableCell padding='dense'>{rider.name}</TableCell>
                <TableCell padding='dense' numeric>{rider.age}</TableCell>
                <TableCell padding='dense' numeric>{rider.weight} kg</TableCell>
                <TableCell padding='dense' numeric>{rider.height} cm</TableCell>
                <TableCell padding='dense'>{rider.gender}</TableCell>
                <TableCell padding='checkbox'>
                  <IconButton color="contrast" aria-label="Edit rider" onClick={this.editRider(rider)}>
                    <EditIcon />
                    <EditRider
                      open={this.state.editingRider === rider.id}
                      onSave={this.saveRider}
                      onCancel={this.hideEditRider}
                      rider={rider}
                    />
                  </IconButton>
                </TableCell>
                <TableCell padding='checkbox'>
                  <IconButton color="contrast" aria-label="Delete rider" onClick={this.deleteRider(rider)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = ({ admin: {token}, riders: { riders } }) => ({
  adminToken: token,
  riders: riders
})

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Riders)