import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Box, Button, Image, Heading, Text  } from "grommet";
import { PopUp, FullForm } from "../components";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

const MUTATION = `
mutation($name: String!) {
  create_item(
    board_id: 865039835,
    group_id: "topics",
    item_name: $name
  ) {
    id
    name
    column_values {
      title
      text
      value
      id
    }
  }
}
`
export const Modal = ({ onClose, config }) => {
  const { REACT_APP_TOKEN: TOKEN } = process.env
  const {title} =  config
  const handleSubmit = (values, { setSubmitting }) => {
    const {name} = values
    monday.setToken(TOKEN)
    monday.api(MUTATION, {variables: {"name": name}}).then((res) => {
      // debugger
      setSubmitting();
      onClose()
    })
  }

  return ( 
    <PopUp onClickOutside={onClose} position="center" modal overflow="auto">
      <Box flex align="center" justify="between">
        <ModalHeader title={title}/>
        <MsgWizard onClose={onClose} doSubmit={handleSubmit}/>
        {/* <ModalControl onClose={onClose} onClick={handleSubmit}/> */}
      </Box>
    </PopUp>
  )
}

const MsgWizard = ({onClose, doSubmit}) => (
  <Box flex direction="row" align="center" justify="evenly" fill="horizontal">
    <Box flex basis="1/2" align="center">
      <Box width="medium">
        <FullForm 
        doSubmit={doSubmit}
        leb={
          <Button primary size="small" color="brand" type="submit">
            <Box pad="small" align="center">
              Create New Message
            </Box>
          </Button>
        }
        close={
          <Button plain onClick={onClose}>
            <Box pad="small" align="center" >
              Cancel
            </Box>
          </Button>
        }
        />
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
const ModalHeader = ({title}) => (
  <Box margin="small" direction="row" justify="center" align="center">
    <Heading margin="small" level="2">
      {title}
    </Heading>
    <Text margin="small" size="xxlarge" weight="200" level="2">
      New
    </Text>
  </Box>
)
const ModalControl  = ({onClose, onClick}) => (
  <Box  direction="row" pad="large">
    <Box pad="small">
      <Button plain onClick={onClose}>
        <Box pad="small" align="center" >
          Cancel
        </Box>
      </Button>
    </Box>
    <Box pad="small" >
      <Button primary size="small" color="brand" onClick={onClick}>
        <Box pad="small" align="center">
          Create New Message
        </Box>
      </Button>
    </Box>
  </Box>
)