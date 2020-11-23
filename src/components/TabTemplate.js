import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useParams,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import { Box, Button, Tab, Tabs  } from 'grommet';
import { Modal } from '../components'
import { ComposeMessages, ComposeSequences } from '../scenes/compose'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const  TabTemplate = () => {
  const [loc, setLoc] = useState(0)
  const history = useHistory()
  const { slug } = useParams();
  const { url, path } = useRouteMatch()
  const tabConfig = ['messages', 'sequences']
  const setTabPath = (index) => {
    setLoc(index)
    history.push(`/compose/${tabConfig[index]}`)
  }
  const ModalButton = ({ label, onClick }) => (
    <Button 
      primary
      label={label}
      onClick={ onClick }
    />
  )
  useEffect(()=>  {
    setLoc(tabConfig.indexOf(slug))
  })

  return (
    <Box flex >
      <Switch>
        <Route path={`${path}/new`}>
          <Modal onClose={() => history.push(url)} />
        </Route>
        <Tabs
          activeIndex={loc}
          fill={true}
          overflow="auto"
          alignControls='start'
          alignSelf='center'
          onActive={(activeIndex) => setTabPath(activeIndex) }
        >
          <Tab title='Messages'>
            <Route exact path="/compose/messages" >
              <ComposeMessages
              addNew={<ModalButton label="New Message" onClick={() => history.push(`${url}/new`)} />}
              />
            </Route>
          </Tab>
          <Tab title='Sequences'>
            <Route exact path="/compose/sequences">
              <ComposeSequences 
              addNew={<ModalButton label="New Sequences" onClick={() => history.push(`${url}/new`)} />}
              />
            </Route>
          </Tab>
        </Tabs>
      </Switch>
    </Box>
  );
}