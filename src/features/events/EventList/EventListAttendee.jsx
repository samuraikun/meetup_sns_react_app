import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
  render() {
    return (
      <List.Item>
        <Image as='a' size='mini' circular src='https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif' />
      </List.Item>
    )
  }
}

export default EventListAttendee;