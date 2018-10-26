import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import cuid from 'cuid';
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import { createEvent, deleteEvent, updateEvent } from '../eventActions'

const mapStateToProps = state => ({
  events: state.events
})

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
}

class EventDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      selectedEvent: null
    }
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true, selectedEvent: null })
  }

  handleCancelEvent = () => {
    this.setState({ isOpen: false, selectedEvent: null })
  }

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent)
    this.setState({
      isOpen: false,
      selectedEvent: null
    })
  }

  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    })
  }

  handleCreateEvent = newEvent => {
    newEvent.id = cuid()
    newEvent.hostPhotoURL = '/assets/user.png'
    this.props.createEvent(newEvent)

    this.setState({ isOpen: false })
  }

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { selectedEvent } = this.state;
    const { events } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            onEventOpen={this.handleOpenEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          { this.state.isOpen && (
            <EventForm
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancelEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, actions)(EventDashboard);