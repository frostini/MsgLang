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

  return (
      <Box align="center">
        <Box width="medium" margin="large">
          <Formik
            initialValues={{ name: '', password: '', boardId: '334343' }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = "required";
              }
              if (!values.employeeId) {
                errors.employeeId = "required";
              } else if (!values.employeeId.match(/^[0-9]+$/)) {
                errors.employeeId = "numeric only";
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
                <FormField label="Email" error={errors.email}>
                  <TextInput
                    name="email"
                    type="email"
                    value={values.email || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="Employee ID" error={errors.employeeId}>
                  <TextInput
                    name="employeeId"
                    value={values.employeeId || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="Size" error={errors.size}>
                  <Select
                    name="size"
                    options={["small", "medium", "large"]}
                    value={values.size || ""}
                    onChange={event => setFieldValue("size", event.value)}
                  />
                </FormField>
                <FormField label="Comments" error={errors.comments}>
                  <TextArea
                    name="comments"
                    value={values.comments || ""}
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