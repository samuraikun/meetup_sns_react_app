import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { toastr } from 'react-redux-toastr'
import { Grid } from 'semantic-ui-react'
import EventDetailHeader from './EventDetailHeader'
import EventDetailInfo from './EventDetailInfo'
import EventDetailChat from './EventDetailChat'
import EventDetailSidebar from './EventDetailSidebar'
import { objectToArray } from '../../../app/common/util/helpers'

const mapStateToProps = state => {
  let event = {}

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event
  }
}

class EventDetailPage extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    
    if (!event.exists) {
      history.push('/events');
      toastr.error('Sorry', 'Event not found!');
    }
  }

  render() {
    const { event } = this.props
    const attendees = event && event.attendees && objectToArray(event.attendees)

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader event={event} />
          <EventDetailInfo event={event} />
          <EventDetailChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirestore(connect(mapStateToProps)(EventDetailPage));
