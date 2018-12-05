import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Button } from 'semantic-ui-react';

const UserDetailSidebar = ({isCurrentUser, followUser, profile }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser ? (
        <Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>
        ) : (
        <Button onClick={() => followUser(profile)} color='teal' fluid basic content='Follow User' />)}
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailSidebar;
