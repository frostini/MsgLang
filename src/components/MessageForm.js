import React from "react";
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  TextArea,
  RadioButtonGroup,
  Select,
} from "grommet";

export const MessageForm = () => (
  <Form onSubmit={({ value }) => console.log("Submit: ", value)}>
    <FormField name="title" label="Title" required={true} />
    <FormField
      name="acknowledge"
      component={TextArea}
      pad={true}
      label="Message Content"
      placeholder="Hello {user}"
    />
    <FormField name="tag" label="Tag" />
  </Form>
);
