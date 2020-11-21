import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';
import { TextHero, Table } from '../../components'
import { configureColumns, tableConfig, configureData, QUERY } from './data'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const ComposeSequences = ({
  addNew
}) => {
  const { REACT_APP_TOKEN: TOKEN } = process.env
  const [sequences, setSequences] = useState({})
  const { columns, items } = sequences
  
  useEffect(() => {
    monday.setToken(TOKEN)
    monday.api(QUERY).then((res) => {
      setSequences(res.data.boards[0])
    })
  }, []);

  return (
    <Box>
      <TextHero
        addNew={addNew}
        title="Compose"
        subTitle="Sequences"
        body="This is the section where content for composing sequences will soon be."
      />
      <Box pad="medium">
        <Table 
          columns={(columns && configureColumns(columns, tableConfig))}
          data={(items && configureData(items))}
        />
      </Box>
    </Box>
  );
}