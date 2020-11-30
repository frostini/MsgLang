import React, { useState } from "react";
import {
  Box,
  Button,
  FormField,
  Text,
  TextArea,
  TextInput
} from "grommet";
import mondaySdk from "monday-sdk-js";
import {userData} from "../utils"
const monday = mondaySdk();
const MUTATIONS = `
  mutation($name: String!, $column_values: JSON!) {
    create_item(
      board_id: 865039835,
      group_id: "topics",
      item_name: $name,
      column_values: $column_values,
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

export const FullForm = ({onClose}) => {
  const [text, setText] = useState(false)
  const [name, setName] = useState(false)
  const { REACT_APP_TOKEN: TOKEN } = process.env

  const interpol= (text) => {
    // const userProfile = JSON.parse(localStorage.getItem("userSession"))  
    let display = text && text.replace(/\{(.*?)\}/g, m => userData[(m.substring(1, m.length-1))]);
    return display
  }
  const handleSubmit = () => {
    monday.setToken(TOKEN)
    monday.api(MUTATIONS, {
      variables: {
        "name": name,
        "column_values": JSON.stringify({text})
      }
    }).then((res) => {
      onClose()
    })
  }

  return (
      <Box flex direction="row" align="center" justify="evenly" fill="horizontal">
        <Box flex basis="1/2" align="center">
          <FormField label="Name">
            <TextInput
              name="name"
              value={name || ""}
              onChange={event => setName(event.target.value)}
            />
          </FormField>
          <FormField label="SMS Text">
            <TextArea
              name="text"
              value={text || ""}
              onChange={event => setText(event.target.value)}
            />
          </FormField>
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
                Create New Message
              </Box>
            </Button>
          </Box>
        </Box>
        <Box flex basis="1/2" align="center" >
          <Box pad="medium" background="light-2" width="medium" height="small">
            <Text>{interpol(text)}</Text>
          </Box>
          <Text>Message Preview</Text>
        </Box>
      </Box>
  );
}