import React, {useEffect, useState} from "react";
import { Box, Heading, Select } from "grommet";
import mondaySdk from "monday-sdk-js";
import { configureData, MESSAGES_QUERY } from '../compose/data'
const monday = mondaySdk();

export const Conduct = () => {

  const { REACT_APP_TOKEN: TOKEN } = process.env
  const [boards, setBoards] = useState([])
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

  const handleSelect = ({value}) => {
    setValue(value)
    const v = selectedBoard(boards, value)
    setColumns(v.columns)
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

const [value, setValue] = useState("");
const [message, setMessage] = useState("");
const [columns, setColumns] = useState(undefined);
const [phoneColumn, setPhoneColumn] = useState(undefined);
const [messages, setMessages] = useState([])

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
    { columns &&
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
