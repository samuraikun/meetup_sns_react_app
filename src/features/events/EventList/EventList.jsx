import React, { Component } from 'react'
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <React.Fragment>
        <h1>Event List</h1>
        {events.map((event) => {
          return <EventListItem key={event.id} event={event} />
        })}
      </React.Fragment>
    )
  }
}

export default EventList;
