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
import ModalManager from '../../features/modals/ModalManager';
import NotFound from '../layout/NotFound';
import { UserIsAuthenticated } from '../../features/auth/authWrapper'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ModalManager />
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
                  <Route path='/event/:id' component={EventDetailPage} />
                  <Route path='/manage/:id' component={UserIsAuthenticated(EventForm)} />
                  <Route path='/people' component={UserIsAuthenticated(PeopleDashboard)} />
                  <Route path='/profile/:id' component={UserIsAuthenticated(UserDetailPage)} />
                  <Route path='/settings' component={UserIsAuthenticated(SettingDashboard)} />
                  <Route path='/createEvent' component={UserIsAuthenticated(EventForm)} />
                  <Route path='/error' component={NotFound} />
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
