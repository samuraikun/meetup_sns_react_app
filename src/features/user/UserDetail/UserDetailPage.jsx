import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from "semantic-ui-react";
import UserDetailHeader from './UserDetailHeader';
import UserDetailDescription from './UserDetailDescription';
import UserDetailPhotos from './UserDetailPhotos';
import UserDetailSidebar from './UserDetailSidebar';
import UserDetailEvents from './UserDetailEvents';
import { userDetailquery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents } from '../userActions';

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
};

const actions = {
  getUserEvents
}

class UserDetailedPage extends Component {
  async componentDidMount() {
    await this.props.getUserEvents(this.props.userUid);
  }

  render() {
    const { profile, photos, auth, match, requesting, events, eventsLoading } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if (loading) return <LoadingComponent inverted={true} />

    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailSidebar isCurrentUser={isCurrentUser} />
        <UserDetailDescription profile={profile} />
        {photos && photos.length > 0 &&
        <UserDetailPhotos photos={photos} />}
        <UserDetailEvents events={events} eventsLoading={eventsLoading} />
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect((auth, userUid) => userDetailquery(auth, userUid))
)(UserDetailedPage);