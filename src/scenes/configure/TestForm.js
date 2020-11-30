import React, { useState, useEffect } from "react";
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
import mondaySdk from "monday-sdk-js";
// import  {useStateWithLocalStorage} from '../../utils'
const monday = mondaySdk();

export const TestForm = ({userData}) => {
  const [submitted, setSubmitted] = useState(false)
  // const [session, setSession] = useStateWithLocalStorage("userSession");

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting();
    // setSession(JSON.stringify(values));
  }
  // let [initialValues, setInitialValues] = useState(
  //   session ? JSON.parse(session) : { name: '', email: '', phone: '' }
  // )

  return (
      <Box pad={{left: 'medium'}}>
        <Box width="medium">
          <Formik
            initialValues={userData}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = "required";
              }
              if (!values.phone) {
                errors.phone = "required";
              }
              if (!values.email) {
                errors.email = "required";
              }
              return errors;
            }}
            validateOnBlur={submitted}
            validateOnChange={submitted}
            onSubmit={handleSubmit}
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
                <FormField label="Phone Number" error={errors.phone}>
                  <TextInput
                    name="phone"
                    value={values.phone || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <Box
                  tag="footer"
                  margin={{ top: "large" }}
                  direction="row"
                  justify="between"
                >
                  <Button pad="small" primary size="large" color="brand" type="submit">
                    <Box pad="small" align="center">
                      Update Test User
                    </Box>
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
  );
}