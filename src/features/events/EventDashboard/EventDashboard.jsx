import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import cuid from 'cuid';
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import { Object } from 'core-js';

const eventsDashboard = [
  {
    id: '1',
    title: 'ピカチュウだからできる絶対にバレないセクハラ講座',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'ピカチュウ',
    hostPhotoURL: 'https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif',
    attendees: [
      {
        id: 'a',
        name: 'ピカチュウ',
        photoURL: 'https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif'
      },
      {
        id: 'b',
        name: 'ゼニガメ',
        photoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif'
      }
    ]
  },
  {
    id: '2',
    title: 'ゼニガメ帝国のさらなる領土拡大について',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'ゼニガメ帝国のさらなる繁栄のためにできることをみんなで考える会です。具体的には、ヒトカゲを1匹残らず駆逐をする方法についてです。',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'ゼー二ガーメ3世',
    hostPhotoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif',
    attendees: [
      {
        id: 'b',
        name: 'ゼニガメ',
        photoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif'
      },
      {
        id: 'a',
        name: 'ピカチュウ',
        photoURL: 'https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif'
      }
    ]
  },
  {
    id: '3',
    title: 'ピカチュウ先輩を出し抜くまでにやったこと',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'アニメで、レギュラーずっとはってるからって調子に乗ってるピカチュウ先輩をどうにかして出し抜いた方法について話します！',
    city: 'Tokyo, Japan',
    venue: 'ピチュー財団記念迎賓館',
    hostedBy: 'ピチュー',
    hostPhotoURL: 'https://media.giphy.com/media/GDuOdHz0lCzNS/giphy.gif',
    attendees: [
      {
        id: 'b',
        name: 'ゼニガメ',
        photoURL: 'https://media.giphy.com/media/LxSFsOTa3ytEY/giphy.gif'
      }
    ]
  }
]

class EventDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: eventsDashboard,
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
    this.setState({
      events: this.state.events.map(event => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent)
        } else {
          return event
        }
      }),
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
    const updatedEvents = [...this.state.events, newEvent]

    this.setState({ events: updatedEvents, isOpen: false })
  }

  handleDeleteEvent = eventId => () => {
    const updatedEvents = this.state.events.filter(e => e.id !== eventId)

    this.setState({
      events: updatedEvents
    })
  }

  render() {
    const { selectedEvent } = this.state;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={this.state.events} />
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

export default EventDashboard;