import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormField,
  Heading,
  Select,
  Text,
  TextArea,
  TextInput
} from "grommet";

export const FullForm = ({onClose}) => {
  const [text, setText] = useState(false)
  const [name, setName] = useState(false)

const interpol= (text) => {
  
  const test = {
    'name':'Marlon',
    'email': 'marlon@email.com'
  };
  
  let display = text && text.replace(/\{(.*?)\}/g, m => test[(m.substring(1, m.length-1))]);
  return display

}
  {
  /**
name,
item_id
text
tags

  const handleSubmit = (values, { setSubmitting }) => {
    const {name,text} = values
    monday.setToken(TOKEN)
    const column_values = (({text}) => ({text}))(values)
    monday.api(MUTATION, {
      variables: {
        "name": name,
        "column_values": JSON.stringify(column_values)
      }
    }).then((res) => {
      setSubmitting();
      onClose()
    })
  }

   */
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
            <Button primary size="small" color="brand" type="submit">
              <Box pad="small" align="center">
                Create New Message
              </Box>
            </Button>
            <Button plain onClick={onClose}>
              <Box pad="small" align="center" >
                Cancel
              </Box>
            </Button>
          </Box>
        </Box>
        <Box flex basis="1/2" align="center" >
          <Box pad="medium" background="light-2" width="medium" height="medium">
            <Text>{interpol(text)}</Text>
          </Box>
          <Text>Message Preview</Text>
        </Box>
      </Box>
  );
}