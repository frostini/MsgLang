import React, {useEffect, useState} from "react";
import { Box, Button, Heading, Select, Text } from "grommet";
import mondaySdk from "monday-sdk-js";
import { configureData, MESSAGES_QUERY, CONTACT_QUERY } from '../compose/data'
const monday = mondaySdk();

export const Conduct = () => {
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
      console.log(await r.json())
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
    <Box direction="column" pad="small">
      <Text>{name}</Text>
      <Text>{phone}</Text>
      <Text>{interpolatedMessage}</Text>
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
    <Box fill align="start" pad="small">
      <Heading level={2}>Create a new Campaign</Heading>
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
      {
        columns && phoneColumn && smsMessages &&
        (<Box>
          {smsMessages.map((el, idx)=> <SimpleTemplate key={idx} {...el}/>)}
          <Box>
          <Button onClick={() => sendSmS(smsMessages)} primary size="small" color="brand" type="submit">
              <Box pad="small" align="center">
                Create New Message
              </Box>
            </Button>
          </Box>
        </Box>)
      }
    </Box>
  ) 
}