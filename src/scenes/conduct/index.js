import React, {useEffect, useState} from "react";
import { Box, Heading, Select } from "grommet";
import mondaySdk from "monday-sdk-js";
import { Underline } from "grommet-icons";
import { configureColumns, tableConfig, configureData, MESSAGES_QUERY } from '../compose/data'
const monday = mondaySdk();


export const Conduct = () => {

  const { REACT_APP_TOKEN: TOKEN } = process.env
  const [boards, setBoards] = useState([])
  const displayBy  = (collection, attribute) => collection.map((b) => b[attribute])
  const selectedBoard = (boards, value) => boards.find(item  => item.name === value)
  // const onSelectChange=()
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
  // const { columns, items } = sequences
  const handleSelect = ({value}) => {
    setValue(value)
    const v = selectedBoard(boards, value)
    setColumns(v.columns)
    // debugger
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
      // const tes  = configureData(
      //   res.data.boards[0].items
      // )
      // debugger
      setMessages(
        configureData(
          res.data.boards[0].items
        )
      )
    })
  }, [])
/**
 on select function translate to id value
 on  options,  render  as names
set value as reference array

  
 
board, form field
  add elements
  add form for submit
  add data loader
column selector

messages/item selector

message generator

message sender

*/
const [value, setValue] = useState("");
const [message, setMessage] = useState("");
const [columns, setColumns] = useState(undefined);
const [phoneColumn, setPhoneColumn] = useState(undefined);
const [messages, setMessages] = useState([])
// debugger
return(
<Box fill align="center" justify="center">
    <Heading>Conduct Index</Heading>
    <Box>
      <Select
        options={displayBy(messages, 'name')}
        closeOnChange={true}
        value={message}
        multiple={false}
        onChange={({value}) => setMessage(value)}
      />
    </Box>
    <Box>
      <Select
        options={displayBy(boards, 'name')}
        closeOnChange={true}
        value={value}
        multiple={false}
        onChange={handleSelect}
      />
    </Box>
    {
      columns &&
      <Box>
        <Select
            value={phoneColumn}
            options={displayBy(columns, 'title')}
            closeOnChange={true}
            onChange={({value}) => setPhoneColumn(value)}
          />
      </Box>
    }
  </Box>
)

}
