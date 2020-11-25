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

export const TwilioForm = () => {
  const [submitted, setSubmitted] = useState(false)
  
  const testIdOnClick = () => {
    const dataa = { from: '+16193736452', phone: '+16193736451', message: 'CORssSs MF' };

fetch('https://batch-send-1358.twil.io/welcome', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  mode:'cors',
  body: JSON.stringify(dataa)
}).then(async r => console.log(await r.json()))
  .catch((error) => {
    debugger
      console.error('Error:', error);
    });
}

  useEffect(() => {
    // testIdOnClick()
  }, [])

const handleSubmit = (values, { setSubmitting }) => {
  // const {name} = values
  // monday.setToken(TOKEN)
  // monday.api(MUTATION, {variables: {"name": name}}).then((res) => {
    debugger
    setSubmitting();
    // onClose()
  }

  return (
      <Box pad={{left: 'medium'}}>
        <Box width="medium">
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
          <Button plain>
            <Box pad="small" align="center" >
              Cancel
            </Box>
          </Button>
          <Button primary size="small" color="brand" type="submit">
            <Box pad="small" align="center">
              Create New Message
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


{
  /**
RESPONSE OBJECT BIYOTCH
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "This is the ship that made the Kessel Run in fourteen parsecs?",
  "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
  "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15017122661",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
}



name,
item_id
text
tags
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
   */
}