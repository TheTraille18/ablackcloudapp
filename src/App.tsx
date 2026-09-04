import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import TopBar from './components/TopBar';
import history from './history';
import Home from './components/Home';
import TaskManagerPage from './components/TaskManagerPage';
import Profile from './components/Profile';
import RagSystem from './components/RagSystem';
import KubeSentryAI from './components/KubeSentryAI';
import CareerPilotAI from './components/CareerPilotAI';
import McpPlatform from './components/McpPlatform';
import GroceryMcp from './components/GroceryMcp';
import GmailMcp from './components/GmailMcp';
import GithubMcp from './components/GithubMcp';
import KnowledgeMcp from './components/KnowledgeMcp';
import Shopping4Chow from './components/Shopping4Chow';
import HouseDetector from './components/HouseDetector';
import AblackcloudApp from './components/AblackcloudApp';
import { airbnbTheme } from './theme/airbnbTheme';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={airbnbTheme}>
      <CssBaseline />
      <div className="App">
        <Router history={history}>
          <TopBar />
          <main className="App-main">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/apps" />
              </Route>
              <Route path="/apps" exact component={Home} />
              <Route path="/apps/task-manager" component={TaskManagerPage} />
              <Route path="/apps/ablackcloudapp" component={AblackcloudApp} />
              <Route path="/apps/rag-system" component={RagSystem} />
              <Route path="/apps/kubesentry-ai" component={KubeSentryAI} />
              <Route path="/apps/careerpilot-ai" component={CareerPilotAI} />
              <Route path="/apps/mcp-platform" component={McpPlatform} />
              <Route path="/apps/grocery-mcp" component={GroceryMcp} />
              <Route path="/apps/gmail-mcp" component={GmailMcp} />
              <Route path="/apps/github-mcp" component={GithubMcp} />
              <Route path="/apps/knowledge-mcp" component={KnowledgeMcp} />
              <Route path="/apps/shopping-4-chow" component={Shopping4Chow} />
              <Route path="/apps/house-detector" component={HouseDetector} />
              <Route path="/mcp">
                <Redirect to="/apps/mcp-platform" />
              </Route>
              <Route path="/grocery-mcp">
                <Redirect to="/apps/grocery-mcp" />
              </Route>
              <Route path="/gmail-mcp">
                <Redirect to="/apps/gmail-mcp" />
              </Route>
              <Route path="/github-mcp">
                <Redirect to="/apps/github-mcp" />
              </Route>
              <Route path="/knowledge-mcp">
                <Redirect to="/apps/knowledge-mcp" />
              </Route>
              <Route path="/taskmanagerapp">
                <Redirect to="/apps/task-manager" />
              </Route>
              <Route path="/rag">
                <Redirect to="/apps/rag-system" />
              </Route>
              <Route path="/kubesentry">
                <Redirect to="/apps/kubesentry-ai" />
              </Route>
              <Route path="/careerpilot">
                <Redirect to="/apps/careerpilot-ai" />
              </Route>
              <Route path="/shopping4chow">
                <Redirect to="/apps/shopping-4-chow" />
              </Route>
              <Route path="/profile">
                <Redirect to="/resume" />
              </Route>
              <Route path="/resume" component={Profile} />
            </Switch>
          </main>
          <footer className="App-footer">
            <span>© Black Cloud Apps</span>
            <span className="App-footer-divider">·</span>
            <span>
              Built with{' '}
              <a
                className="App-footer-link"
                href="https://cursor.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cursor
              </a>
            </span>
            <span className="App-footer-divider">·</span>
            <span>Privacy</span>
            <span className="App-footer-divider">·</span>
            <span>Terms</span>
          </footer>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
