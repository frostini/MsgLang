import React from "react";
import { Box, Heading, Text  } from "grommet";
import { PopUp } from "../../components";
import {CampaignForm} from './CampaignForm'

export const NewCampaign = ({ onClose, config }) => {
  const {title} =  config
  return ( 
    <PopUp onClickOutside={onClose} position="center" modal overflow="auto">
      <Box overflow="scroll" flex direction="column" align="center" justify="start">
        <ModalHeader title={title}/>
        <MsgWizard onClose={onClose} />
      </Box>
    </PopUp>
  )
}
const MsgWizard = ({onClose}) => (
  <Box flex direction="row" >
    <CampaignForm onClose={onClose}/>
  </Box>
)
const ModalHeader = ({title}) => (
  <Box margin="small" direction="row" justify="center" align="center">
    <Text margin="small" size="xxlarge" weight="200" level="2">
      New
    </Text>
    <Heading margin="small" level="2">
      {title}
    </Heading>
  </Box>
)