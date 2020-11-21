import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useParams,
  useHistory
} from "react-router-dom";
import { Box, Button, Tab, Tabs  } from 'grommet';
import { Modal } from '../components'
import { ComposeMessages, ComposeSequences } from '../scenes/compose'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const  TabTemplate = () => {
  const [hello, setHello] = useState(false);
  const [goodbye, setGoodbye] = useState(false);
  const [path, setPath] = useState(0)
  const history = useHistory()
  const {slug} = useParams();
  
  const tabConfig = ['messages', 'sequences']
  
  const setTabPath = (index) => {
    setPath(index)
    history.push(`/compose/${tabConfig[index]}`)
  }

  const toggleState = (setState) =>  {
    setState(state => !state )
  }

  const ModalButton = ({ label, onClick }) => (
    <Button 
      primary
      label={label}
      onClick={ onClick }
    />
  )

  useEffect(()=>  {
    setPath(tabConfig.indexOf(slug))
  })

  return (
    <Box flex >
      <Switch>
        <Tabs 
          activeIndex={path}
          fill={true}
          overflow="auto"
          alignControls='start'
          alignSelf='center'
          onActive={(activeIndex) => setTabPath(activeIndex) }
        >
          <Tab title='Messages'>
            <Route path="/compose/messages" >
              <ComposeMessages
              addNew={<ModalButton label="New Message" onClick={() => toggleState(setHello)} />}
              />
            </Route>
          </Tab>
          <Tab title='Sequences'>
            <Route path="/compose/sequences">
              <ComposeSequences 
              addNew={<ModalButton label="New Sequences" onClick={() => toggleState(setGoodbye)} />}
              />
            </Route>
          </Tab>
        </Tabs>
      </Switch>
      {hello && <Modal onClose={() => toggleState(setHello)} />}
      {goodbye && <Modal onClose={() => toggleState(setGoodbye)} />}
    </Box>
  );
}