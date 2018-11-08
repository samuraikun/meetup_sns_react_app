import React, { Component } from 'react'
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props;

    return (
      <React.Fragment>
        {events && events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
          />
        ))}
      </React.Fragment>
    )
  }
}

export default EventList;
