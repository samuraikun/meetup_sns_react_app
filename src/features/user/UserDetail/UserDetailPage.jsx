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
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
  }
};

class UserDetailedPage extends Component {
  render() {
    const { profile, photos, auth, match } = this.props;
    const isCurrentUser = auth.uid === match.params.id;

    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailSidebar isCurrentUser={isCurrentUser} />
        <UserDetailDescription profile={profile} />
        {photos && photos.length > 0 &&
        <UserDetailPhotos photos={photos} />}
        <UserDetailEvents />
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((auth, userUid) => userDetailquery(auth, userUid))
)(UserDetailedPage);