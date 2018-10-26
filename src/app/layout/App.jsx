import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar/NavBar'
import EventForm from '../../features/events/EventForm/EventForm'
import SettingDashboard from '../../features/user/Settings/SettingsDashboard'
import UserDetailPage from '../../features/user/UserDetail/UserDetailPage'
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard'
import EventDetailPage from '../../features/events/EventDetail/EventDetailPage';
import HomePage from '../../features/home/HomePage'
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path='/events' component={EventDashboard} />
                  <Route path='/test' component={TestComponent} />
                  <Route path='/events/:id' component={EventDetailPage} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserDetailPage} />
                  <Route path='/settings' component={SettingDashboard} />
                  <Route path='/createEvent' component={EventForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
