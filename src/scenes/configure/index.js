import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useParams,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import { Box, Button, Heading, Tab, Tabs  } from 'grommet';
import { Modal } from '../../components'
import { TwilioForm } from './TwilioForm'
import { TestForm } from './TestForm'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();
export const Configure = () => {

return (
  <Box fill align="center" justify="center">
    <Tabs
      fill={true}
      overflow="auto"
      alignControls='start'
      alignSelf='center'
      pad={{top: 'medium'}}
    >
      <Tab title='2. Test User'>
        <Heading margin={'medium'} level={2}>Test Users</Heading>
        <TestForm/>
      </Tab>
      <Tab title='1. Twilio'>
        <Heading margin={'medium'} level={2}>Twilio</Heading>
        <TwilioForm/>
      </Tab>

    </Tabs>
  </Box>
)
}


{
  /**
   








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
  const [tabIdx, setTabIdx] = useState(0)
  const history = useHistory()
  const { slug } = useParams();
  const { url, path } = useRouteMatch()

  const tabFig = {
    list: ['messages', 'sequences'],
    messages: {
     index:  0,
     title: 'Messages'
    },
    sequences: {
     index:  1,
     title: 'Sequences'
    }
  }

  const setTabPath = (index) => {
    setTabIdx(index)
    history.push(`/compose/${tabFig['list'][index]}`)
  }
  const ModalButton = ({ label, onClick }) => (
    <Button 
      primary
      label={label}
      onClick={ onClick }
    />
  )
  useEffect(()=>  {
    setTabIdx(tabFig['list'].indexOf(slug))
  })

  return (
    <Box flex >
      <Switch>
        <Route path={`${path}/new`}>
          <Modal 
            onClose={() => history.push(url)}
            config={tabFig[slug]}
          />
        </Route>
        <Tabs
          activeIndex={tabIdx}
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

   */
}