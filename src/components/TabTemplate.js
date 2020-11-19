import React, { useState, useEffect } from 'react';
import { Box, Button, Tab, Tabs, Text, Image } from 'grommet';
import { TextHero, Modal, Table } from '../components'
import { composeIndexSceneData } from '../scenes/compose/data'
import { ComposeMessages, ComposeSequences } from '../scenes/compose'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const  TabTemplate = () => {
  const [answer, setAnswer] = useState(false);
  const [hello, setHello] = useState(false);
  const [goodbye, setGoodbye] = useState(false);
  const {columns, data} = composeIndexSceneData

  const toggleState = (setState) =>  {
    setState(state => !state )
  }

  useEffect(()=>{
    monday.listen("context", res => {
      setAnswer(res.data)
    });
  })

  const ModalButton = ({ label, onClick }) => (
    <Button 
      primary
      label={label}
      onClick={ onClick }
    />
  )
// title, component: ,props: [{name: '', value: <Value/>}]

  return (
    <Box flex >
      <Tabs 
        fill={true}
        overflow="auto"
        alignControls='start'
        alignSelf='center'
      >
        <Tab title='Messages'>
          <ComposeMessages
          addNew={<ModalButton label="New Message" onClick={() => toggleState(setHello)} />}
          />
        </Tab>
        <Tab title='Sequences'>
          <ComposeSequences 
          addNew={<ModalButton label="New Sequences" onClick={() => toggleState(setGoodbye)} />}
          />
        </Tab>
      </Tabs>
      {hello && <Modal onClose={() => toggleState(setHello)} />}
      {goodbye && <Modal onClose={() => toggleState(setGoodbye)} />}
    </Box>
  );
}