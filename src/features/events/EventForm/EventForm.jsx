import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import cuid from 'cuid'
import { Segment, Form, Button } from 'semantic-ui-react'
import { createEvent, updateEvent } from '../eventActions'

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  }

  onFormSubmit = e => {
    e.preventDefault()
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }

      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }
  }

  onInputChange = e => {
    const newEvent = this.state.event
    newEvent[e.target.name] = e.target.value
    
    this.setState({ event: newEvent })
  }

  render() {
    const { event } = this.state

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Field name='title' type='text' component='input' placeholder='Event Title' />
          <Form.Field>
            <label>Event Date</label>
            <input name='date' onChange={this.onInputChange} value={event.date} type="date" placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name='city' onChange={this.onInputChange} value={event.city} placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name='venue' onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name='hostedBy' onChange={this.onInputChange} value={event.hostedBy} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button onClick={this.onFormSubmit} positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

export default connect(mapStateToProps, actions)(reduxForm({form: 'eventForm'})(EventForm));
