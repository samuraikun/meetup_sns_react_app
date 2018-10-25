import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'

const eventsDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
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
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
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
  }
]

class EventDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: eventsDashboard,
      isOpen: false
    }
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true })
  }

  handleFormClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          { this.state.isOpen && <EventForm handleCancel={this.handleFormClose} /> }
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard;