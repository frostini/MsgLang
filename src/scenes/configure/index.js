import React from 'react';
import { Box, Heading, Tab, Tabs } from 'grommet';
import { TwilioForm } from './TwilioForm'
import { TestForm } from './TestForm'
import { userData, twilioData} from '../../utils'
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
        <Tab title='1. Twilio'>
          <Box pad="small">
            <Heading margin={'medium'} level={2}>Twilio Config</Heading>
            <TwilioForm twilioData={twilioData}/>
          </Box>
        </Tab>
        <Tab title='2. Test User'>
          <Box pad="small">
            <Heading margin={'medium'} level={2}>Test User Config</Heading>
            <TestForm userData={userData}/>
          </Box>
        </Tab>
      </Tabs>
    </Box>
  )
}
