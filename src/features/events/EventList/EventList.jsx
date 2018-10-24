import React, { Component } from 'react'
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Event List</h1>
        <EventListItem />
      </React.Fragment>
    )
  }
}

export default EventList;
