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
import  {useStateWithLocalStorage} from '../../utils'

export const TwilioForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [session, setSession] = useStateWithLocalStorage("twilioSession");

  const testIdOnClick = () => {
    const dataa = { from: '+16193736452', phone: '+16193736451', message: 'CORssSs MF' };

    fetch('https://batch-send-1358.twil.io/welcome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode:'cors',
      body: JSON.stringify(dataa)
    })
    .then(async r => console.log(await r.json()))
    .catch((error) => {
        console.error('Error:', error);
    });
}

  useEffect(() => {
    // testIdOnClick()
  }, [])

const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting();
    setSession(JSON.stringify(values));
  }
  let [initialValues, setInitialValues] = useState(
    session ? JSON.parse(session) : { token: '', sid: '', phone: '' }
  )


  return (
      <Box pad={{left: 'medium'}}>
        <Box width="medium">
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {};
              if (!values.token) {
                errors.token = "required";
              }
              if (!values.sid) {
                errors.sid = "required";
              } 
              if (!values.phone) {
                errors.phone = "required";
              } 
              // else if (!values.employeeId.match(/^[0-9]+$/)) {
              //   errors.employeeId = "numeric only";
              // }
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
                <FormField label="Twilio API Token" error={errors.token}>
                  <TextInput
                    name="token"
                    value={values.token || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="Twilio SID" error={errors.sid}>
                  <TextInput
                    name="sid"
                    value={values.sid || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="Send From Phone Number" error={errors.phone}>
                  <TextInput
                    name="phone"
                    value={values.phone || ""}
                    onChange={handleChange}
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