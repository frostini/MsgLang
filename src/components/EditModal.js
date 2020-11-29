import React from "react";
import { Box, Heading, Text  } from "grommet";
import { PopUp, LoadedForm } from "../components";

export const EditModal = ({ onClose, config }) => {
  const {title} =  config
  return ( 
    <PopUp onClickOutside={onClose} position="center" modal overflow="auto">
      <Box flex align="center" justify="between">
        <ModalHeader title={title}/>
        <MsgWizard onClose={onClose} />
      </Box>
    </PopUp>
  )
}
const MsgWizard = ({onClose, doSubmit}) => (
  <Box flex direction="row" align="center" justify="evenly" fill="horizontal">
    <LoadedForm
      onClose={onClose}
    />
  </Box>
)
const ModalHeader = ({title}) => (
  <Box margin="small" direction="row" justify="center" align="center">
    <Heading margin="small" level="2">
      {title}
    </Heading>
    <Text margin="small" size="xxlarge" weight="200" level="2">
      Message
    </Text>
  </Box>
)