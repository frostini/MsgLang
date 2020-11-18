import React from "react";
import { Box, Button, Image, Heading, Text  } from "grommet";
import { PopUp, MessageForm } from "../components";


export const Modal = ({ onClose }) => (
  <PopUp onClickOutside={onClose} position="center" modal>
    <Box flex align="center" justify="between">
      <ModalHeader />
      <MsgWizard/>
      <ModalControl onClose={onClose}/>
    </Box>
  </PopUp>
);

const MsgWizard = () => (
  <Box flex direction="row" align="center" justify="evenly" fill="horizontal">
    <Box flex basis="1/2" align="center">
      <Box width="medium">
        <MessageForm/>
      </Box>
    </Box>
    <Box flex basis="1/2" align="center" >
      <Box background="light-2" width="medium" height="medium">
        <Text>Hello <b>Marlon</b></Text>
      </Box>
      <Text>Message Preview</Text>
    </Box>
  </Box>
)
const ModalHeader = () => (
  <Box margin="small" direction="row" justify="center" align="center">
    <Heading margin="small" level="2">
      Messages
    </Heading>
    <Text margin="small" size="xxlarge" weight="200" level="2">
      New
    </Text>
  </Box>
)
const ModalControl  = ({onClose}) => (
  <Box  direction="row" pad="large">
    <Box pad="small">
      <Button plain onClick={onClose}>
        <Box pad="small" align="center" >
          Cancel
        </Box>
      </Button>
    </Box>
    <Box pad="small" >
      <Button primary size="small" color="brand" onClick={onClose}>
        <Box pad="small" align="center">
          Create New Message
        </Box>
      </Button>
    </Box>
  </Box>
)