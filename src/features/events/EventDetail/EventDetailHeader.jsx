import React from 'react'
import {
  Segment,
  Image,
  Item,
  Header,
  Button
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const EventDetailHeader = ({ event, isHost, isGoing, goingToEvent }) => {
  let eventDate;
  if (event.date) {
    eventDate = event.date.toDate();
  }

  return (
    <div>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: '0' }}>
          <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />
  
          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{ color: 'white' }}
                  />
                  <p>{format(eventDate, 'YYYY/MM/DD')}</p>
                  <p>
                    Hosted by <strong>{event.hostedBy}</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
  
        <Segment attached="bottom">
          {!isHost &&
            <React.Fragment>
              {isGoing ? (
                <Button>Cancel My Place</Button>
              ) : (
                <Button onClick={() => goingToEvent(event)} color="teal">JOIN THIS EVENT</Button>
              )}
            </React.Fragment>
          }
          {isHost &&
          <Button as={Link} to={`/manage/${event.id}`} color="orange">
            Manage Event
          </Button>}
        </Segment>
      </Segment.Group>
    </div>
  )
}

export default EventDetailHeader
