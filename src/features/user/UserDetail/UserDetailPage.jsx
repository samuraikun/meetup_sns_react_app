import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment } from "semantic-ui-react";
import UserDetailHeader from './UserDetailHeader';

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
        <Grid.Column width={12}>
          <Segment>
            <Item.Group>
              <UserDetailHeader profile={profile} />
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            <Button as={Link} to='/settings/basic' color='teal' fluid basic content='Edit Profile'/>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon='smile' content='About Display Name'/>
                <p>I am a: <strong>{profile.about}</strong></p>
                <p>Originally from <strong>{profile.origin || 'somewhere..'}</strong></p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header icon='heart outline' content='Interests'/>
                <List>
                  {profile.interests.length !== 0 && profile.interests.map(interest => (
                    <Item key={interest}>
                      <Icon name='heart'/>
                      <Item.Content>{interest}</Item.Content>
                    </Item>
                  ))}
                </List>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon='image' content='Photos'/>
            <Image.Group size='small'>
              {photos &&
                photos.map(photo => (
                  <Image key={photo.id} src={photo.url} />
              ))}
            </Image.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon='calendar' content='Events'/>
            <Menu secondary pointing>
              <Menu.Item name='All Events' active/>
              <Menu.Item name='Past Events'/>
              <Menu.Item name='Future Events'/>
              <Menu.Item name='Events Hosted'/>
            </Menu>
            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Event Title
                  </Card.Header>
                  <Card.Meta textAlign='center'>
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Event Title
                  </Card.Header>
                  <Card.Meta textAlign='center'>
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);