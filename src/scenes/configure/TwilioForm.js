import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormField,
  TextInput
} from "grommet";
import  {useStateWithLocalStorage} from '../../utils'

export const TwilioForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [session, setSession] = useStateWithLocalStorage("twilioSession");
  const [initialValues, setInitialValues] = useState(
    session ? JSON.parse(session) : { token: '', sid: '', phone: '' }
  )
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting();
    setSession(JSON.stringify(values));
  }

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
                    type="password"
                    name="token"
                    value={values.token || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="Twilio SID" error={errors.sid}>
                  <TextInput
                    type="password"
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
                  margin={{ top: "large" }}
                  direction="row"
                  justify="between"
                >
                  <Button primary size="small" color="brand" type="submit">
                    <Box pad="small" align="center">
                      Update Twilio Config
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
TWILIO RESPONSE OBJECT
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
   */
}

{
  /**
 name: obj['body']
  const body = {  
"text9": obj['sid'],
"text": obj['to],
"text4": obj['from],
"text6": obj['date_created],
"text41": obj['id']
}
   */
}
// ["name Name",
//  "text9 MsgSID",
//  "text To",
//  "text4 From",
//  "text6 Sent On",
//  "text41 Contact Id"]
// debugger
// monday.api(CREATE_MSG_ITEM, {
//   variables: {
//     "name": name,
//     "column_values": JSON.stringify({text})
//   }
// }).then((res) => {
//   onClose()
// })