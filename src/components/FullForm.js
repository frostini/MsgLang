import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormField,
  Heading,
  Select,
  TextArea,
  TextInput
} from "grommet";

export const FullForm = ({leb, close,doSubmit}) => {
  const [submitted, setSubmitted] = useState(false)
{
  /**
name,
item_id
text
tags

   */
}
  return (
      <Box align="center">
        <Box width="medium" margin="large">
          <Formik
            initialValues={{ name: '', text: '', boardId: '334343' }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = "required";
              }
              if (!values.text) {
                errors.text = "required";
              }
              return errors;
            }}
            validateOnBlur={submitted}
            validateOnChange={submitted}
            onSubmit={doSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              setFieldValue
            }) => (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  setSubmitted(true);
                  handleSubmit();
                }}
              >
                <FormField label="Name" error={errors.name}>
                  <TextInput
                    name="name"
                    value={values.name || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="SMS Text" error={errors.text}>
                  <TextArea
                    name="text"
                    value={values.text || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <Box
                  tag="footer"
                  margin={{ top: "medium" }}
                  direction="row"
                  justify="between"
                >
                  {close}
                  {leb}
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
  );
}