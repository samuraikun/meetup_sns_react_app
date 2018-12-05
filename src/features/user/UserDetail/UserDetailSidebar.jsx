import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Button } from 'semantic-ui-react';

const UserDetailSidebar = ({isCurrentUser, isFollowing ,followUser, unfollowUser, profile }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>
        )}

        {!isCurrentUser && !isFollowing && (
          <Button onClick={() => followUser(profile)} color='teal' fluid basic content='Follow' />
        )}

        {!isCurrentUser && isFollowing && (
          <Button onClick={() => unfollowUser(profile)} color='teal' fluid basic content='Unfollow' />
        )}
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailSidebar;
