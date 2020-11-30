import React, {useEffect, useState} from "react";
import { Box, Button, Heading, Select, Text } from "grommet";
import mondaySdk from "monday-sdk-js";
import { configureData, MESSAGES_QUERY, CONTACT_QUERY, CREATE_MSG_ITEM } from '../compose/data'
const monday = mondaySdk();

export const CampaignForm = ({onClose}) => {
  const { REACT_APP_TOKEN: TOKEN } = process.env
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [columns, setColumns] = useState(undefined);
  const [phoneColumn, setPhoneColumn] = useState(undefined);
  const [messages, setMessages] = useState([])
  const [boards, setBoards] = useState([])
  const [smsMessages, setSmsMessages] = useState([])
  const displayBy  = (collection, attribute) => collection.map((b) => b[attribute])
  const selectedBoard = (boards, value) => boards.find(item  => item.name === value)
  const BOARDS_QUERY = `
  {
    boards {
      id
      name
      columns {
        id
        title
        type
      }
    }
  }
  `
  const sendSmS = (smsMessages) => {
    const body = JSON.stringify({
      messageList: smsMessages 
    })
    
    fetch('https://batch-send-1358.twil.io/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode:'cors',
      body: body
    })
    .then(async r => {
      const tee  = await r.json()
    createSentMessage(smsMessages, tee.data)
      
    
      // console.log(joint)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
const createSentMessage = (msgs, data) => {
  monday.setToken(TOKEN)
  Promise.all(
    msgs.map((msg, idx) => {
    const obj = {...msg, ...data[idx]}

    const body = {  
      "text9": obj['sid'],
      "text": obj['to'],
      "text4": obj['from'],
      "text6": obj['dateCreated'],
      "text41": obj['id']
    }
    monday.api(CREATE_MSG_ITEM, {
      variables: {
        "name": obj['body'],
        "column_values": JSON.stringify(body)
      }
    }).then((res) => {
      return res
    })
  })
).then((results) => {
  // return results
  onClose()
  // response.setBody({data: results});
  // print response for debugging purposes.
  // console.log('Here are the results:' + results)
  // return callback(null, response);
})
}


const addInterpolatedMessage = (text, values) => (
  text.replace(/\{(.*?)\}/g, m => values[(m.substring(1, m.length-1))])
)

const enrich = (coll) => {
  const messageToSend = messages.find(o => o['name'] === message)
  return coll.map(el=> {
   return ((el) => ({ ...el, interpolatedMessage: addInterpolatedMessage(messageToSend['text'], el) }))(el)
  })  
}

const getMessageData = (phoneValue) => {
  setPhoneColumn(phoneValue)
  const {id} = selectedBoard(boards, value)

  monday.setToken(TOKEN)
  monday.api(CONTACT_QUERY, {
    variables: {
      "ids": +id
    }
  }).then((res) => { 
    setSmsMessages(
      enrich(
        configureData(
          res.data.boards[0].items
        )
      )
    )
  })
}

const SimpleTemplate = (props) => {
  const {name, phone, interpolatedMessage} = props

  return(
    <Box pad="small" direction="column">
      <Box pad="small" round={true} background="light-2" direction="column" margin={{bottom: 'small'}}>
        <Text  pad={{horizontal:'small'}}>{interpolatedMessage}</Text>
      </Box>
      <Box pad={{bottom: 'small'}} direction="row">
        <Text >{name}</Text>
        <Text weight="bold" margin={{horizontal: "small"}}>|</Text>
        <Text >{phone}</Text>
      </Box>
    </Box>
  )
}

  useEffect(() => {
    monday.setToken(TOKEN)
    monday.api(BOARDS_QUERY).then((res) => {
      setBoards(res.data.boards)
    })
  }, [])

  useEffect(() => {
    monday.setToken(TOKEN)
    monday.api(MESSAGES_QUERY).then((res) => {
      setMessages(
        configureData(
          res.data.boards[0].items
        )
      )
    })
  }, [])

  const handleSelect = ({value}) => {
    setValue(value)
    const v = selectedBoard(boards, value)
    setColumns(v.columns)
  }

  const showOption = (collection, option, value) =>  {
    const vals = collection.find(o => o[option] === value)
    const {name, text} = vals
    return  (
      <Box direction="column">
        <Text>{name}</Text>
        <Text>{text || 'ERROR. no message body.'}</Text>
      </Box>
    )
  }

  return(
    <Box align="center" pad="small">
      <Box flex direction="row" align="start" justify="evenly" fill="horizontal">
        <Box flex basis="1/2" align="center">
          <Box pad="small">
            <Text>Select Message</Text>
            <Select
              options={displayBy(messages, 'name')}
              closeOnChange={true}
              value={message}
              multiple={false}
              onChange={({value}) => setMessage(value)}
            >
              {option => showOption(messages, 'name', option)}
            </Select>
          </Box>
          <Box pad="small">
            <Text>Select Contact Table</Text>
            <Select
              options={displayBy(boards, 'name')}
              closeOnChange={true}
              value={value}
              multiple={false}
              onChange={handleSelect}
            />
          </Box>
          { columns &&
            <Box pad="small">
              <Text>Select Phone Number Column</Text>
              <Select
                  value={phoneColumn}
                  options={displayBy(columns, 'title')}
                  closeOnChange={true}
                  onChange={({value}) => getMessageData(value)}
                />
            </Box>
          }
        </Box>
        { columns && phoneColumn && smsMessages &&
          <Box flex basis="1/2" align="center">
            {smsMessages.map((el, idx)=> <SimpleTemplate key={idx} {...el}/>)}
          </Box>
        }
      </Box>
      { columns && phoneColumn && smsMessages &&
        <Box direction="row">
          <Box pad="small" size="small">
            <Button alignSelf="start" plain onClick={onClose}>
              <Box pad="small" align="center">
                Cancel
              </Box>
            </Button>
          </Box>

          <Box pad="small" size="small">
          <Button fill={false} alignSelf="start" onClick={() => sendSmS(smsMessages)} primary  color="brand" type="submit">
            <Box pad="small" align="center">
              Create Campaign
            </Box>
          </Button>
        </Box>
        </Box>
      }
    </Box>
  )
}