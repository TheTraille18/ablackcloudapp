import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import TopBar from './components/TopBar';
import history from './history';
import Home from './components/Home';
import TaskManagerApp from './components/TaskManagerApp';
import Profile from './components/Profile';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/apps" />
          </Route>
          <Route path="/apps" component={Home} />
          <Route
            path="/taskmanagerapp"
            render={(props) => (
              <TaskManagerApp
                {...props}
                user={localStorage.getItem('user') || 'guest'}
              />
            )}
          />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
