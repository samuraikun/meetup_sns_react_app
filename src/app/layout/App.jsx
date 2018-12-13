import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { UserIsAuthenticated } from '../../features/auth/authWrapper'

// code spliting by 'react-loadable'
const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingComponent
});

const AsyncEventDashboard = Loadable({
  loader: () => import('../../features/events/EventDashboard/EventDashboard'),
  loading: LoadingComponent
});

const AsyncNavBar  = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingComponent
});

const AsyncEventForm = Loadable({
  loader: () => import('../../features/events/EventForm/EventForm'),
  loading: LoadingComponent
});

const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/SettingsDashboard'),
  loading: LoadingComponent
});

const AsyncUserDetailPage = Loadable({
  loader: () => import('../../features/user/UserDetail/UserDetailPage'),
  loading: LoadingComponent
});

const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent
});

const AsyncEventDetailPage = Loadable({
  loader: () => import('../../features/events/EventDetail/EventDetailPage'),
  loading: LoadingComponent
});

const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent
});

const AsyncNotFound = Loadable({
  loader: () => import('../../app/layout/NotFound'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AsyncModalManager />
        <Switch>
          <Route exact path='/' component={AsyncHomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <AsyncNavBar />
              <Container className="main">
                <Switch>
                  <Route path='/events' component={AsyncEventDashboard} />
                  <Route path='/event/:id' component={AsyncEventDetailPage} />
                  <Route path='/manage/:id' component={UserIsAuthenticated(AsyncEventForm)} />
                  <Route path='/people' component={UserIsAuthenticated(AsyncPeopleDashboard)} />
                  <Route path='/profile/:id' component={UserIsAuthenticated(AsyncUserDetailPage)} />
                  <Route path='/settings' component={UserIsAuthenticated(AsyncSettingsDashboard)} />
                  <Route path='/createEvent' component={UserIsAuthenticated(AsyncEventForm)} />
                  <Route path='/error' component={AsyncNotFound} />
                  <Route component={AsyncNotFound} />
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
