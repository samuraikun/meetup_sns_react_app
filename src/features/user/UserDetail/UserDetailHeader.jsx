import React from 'react';
import { Grid, Item, Header, Segment } from 'semantic-ui-react';
import differenceInYears from 'date-fns/difference_in_years';

const UserDetailHeader = ({ profile }) => {
  const age = profile.dateOfBirth ? differenceInYears(Date.now(), profile.dateOfBirth.toDate()) : 'unknown';

  return (
    <Grid.Column width={12}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size='small'
              src={profile.photoURL || '/assets/user.png'}
            />
            <Item.Content verticalAlign='bottom'>
              <Header as='h1'>{profile.displayName || 'unknown'}</Header>
              <br/>
              <Header as='h3'>Age: {age}</Header>
              <br/>
              <Header as='h3'>{profile.occupation || 'unknown'}</Header>
              <br/>
              <Header as='h3'>{profile.origin || 'unknown city'}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailHeader;
