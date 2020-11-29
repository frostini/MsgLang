import React,{ useEffect, useState } from "react";
import { Box, Button, Heading, Text  } from "grommet";
import { PopUp, LoadedForm } from "../components";
import { useParams } from "react-router-dom";
import { MESSAGE_QUERY, DELETE_MESSAGE, configureItem } from  '../scenes/compose/data'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const DeleteModal = ({ onClose, config }) => {
  const [message, setMessage] = useState(undefined)
  const {title} =  config
  const {id} = useParams()
  const { REACT_APP_TOKEN: TOKEN } = process.env
  
  useEffect(() => {
    monday.setToken(TOKEN)
    monday.api(MESSAGE_QUERY, {
      variables: {
        "ids": +id
      }
    }).then((res) => {
      setMessage(
        configureItem(res.data.items)[0]
      )
    })
  }, [])

  const handleSubmit = () => {
    monday.setToken(TOKEN)
    monday.api(DELETE_MESSAGE, {
      variables: {
        "item_id": +id
      }
    }).then((res) => {
      onClose()
    })
  }

  return ( 
    <PopUp onClickOutside={onClose} position="center" modal overflow="auto">
      <Box flex pad="medium" align="center">
        <ModalHeader title={title}/>
        <Box direction="column">
          <Heading level={4}>
            Are you sure you want to delete this message?
          </Heading>
          <Box pad="small">
            <Text weight="600" level="1">
              {message && `Name`}
            </Text>
            <Text weight="200" level="1">
              {message && message.name}
            </Text>
          </Box>
          <Box pad="small">
            <Text weight="600" level="1">
              {message && `Text`}
            </Text>
            <Text weight="200" level="1">
              {message && message.text}
            </Text>
          </Box>
        </Box>
        <Box
            tag="footer"
            margin={{ top: "medium" }}
            direction="row"
            justify="between"
          >
            <Button plain onClick={onClose}>
              <Box pad="small" align="center" >
                Cancel
              </Box>
            </Button>
            <Button onClick={() => handleSubmit()} primary size="small" color="brand" type="submit">
              <Box pad="small" align="center">
                Delete Message
              </Box>
            </Button>
          </Box>
      </Box>
    </PopUp>
  )
}

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