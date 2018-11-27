import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react'
import format from 'date-fns/format'
import japan from 'date-fns/locale/ja'
import EventListAttendee from './EventListAttendee'

class EventListItem extends Component {
  render() {
    const { event, deleteEvent } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
                {event.cancelled && (
                <Label style={{top: '--40px'}} ribbon='right' color='red' content='Thlis event has been cancelled' />)}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), 'YYYY/MM/DD', { locale: japan })} {' '}
            {format(event.date.toDate(), 'HH:mm')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && Object.values(event.attendees).map((attendee, index) => {
              return <EventListAttendee key={index} attendee={attendee} />
            })}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            onClick={deleteEvent(event.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          />
          <Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventListItem;
