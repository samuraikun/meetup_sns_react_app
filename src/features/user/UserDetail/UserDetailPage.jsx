import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from "semantic-ui-react";
import UserDetailHeader from './UserDetailHeader';
import UserDetailDescription from './UserDetailDescription';
import UserDetailPhotos from './UserDetailPhotos';
import UserDetailSidebar from './UserDetailSidebar';
import UserDetailEvents from './UserDetailEvents';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ];
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
});

class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;

    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailSidebar />
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
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);