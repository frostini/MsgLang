import React, { Component }  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  Box,
  Grommet,
} from 'grommet';
import { Sidebar, Brand } from './components'
import { theme } from './theme'
import {
  routes,
  userSession
} from './routes'


class App extends Component {

  render() {
  return (
    <Router>
    <Grommet theme={theme} full>
      <Box direction="row" fill>
        <Sidebar
          appIcon={<Brand />}
          appName="msglang"
          items={routes}
          userSession={userSession}
        />
        <Box flex>
          <Switch>
            { routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </Box>
      </Box>
    </Grommet>
  </Router>
  )
};
}
export { App }