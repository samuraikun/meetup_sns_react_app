import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { Grid } from 'semantic-ui-react'
import EventDetailHeader from './EventDetailHeader'
import EventDetailInfo from './EventDetailInfo'
import EventDetailChat from './EventDetailChat'
import EventDetailSidebar from './EventDetailSidebar'
import { objectToArray } from '../../../app/common/util/helpers'
import { goingToEvent } from '../../user/userActions'

const mapStateToProps = state => {
  let event = {}

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event,
    auth: state.firebase.auth
  }
}

const actions = {
  goingToEvent
}

class EventDetailPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`); 
  }

  render() {
    const { event, auth, goingToEvent } = this.props
    const attendees = event && event.attendees && objectToArray(event.attendees)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader event={event} isHost={isHost} isGoing={isGoing} goingToEvent={goingToEvent} />
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

export default withFirestore(connect(mapStateToProps, actions)(EventDetailPage));
