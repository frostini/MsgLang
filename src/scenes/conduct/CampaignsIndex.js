import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from 'grommet';
import { TextHero, Table } from '../../components'
// import { NeWCampaign } from './NewCampaign'
import { configureColumns, historyConfig, configureHistory, HISTORY_QUERY } from '../compose/data'
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const CampaignsIndex = () => {

  const history = useHistory()
  const { url, path } = useRouteMatch()

  const { REACT_APP_TOKEN: TOKEN } = process.env
  const [sequences, setSequences] = useState({})
  const { columns, items } = sequences
  // debugger
  useEffect(() => {
    monday.setToken(TOKEN)
    monday.api(HISTORY_QUERY).then((res) => {
      setSequences(res.data.boards[0])
    })
  }, []);

  const ModalButton = ({ label, onClick }) => (
    <Button 
      primary
      label={label}
      onClick={ onClick }
    />
  )

  return (
    <Switch>
      <Route exact path="/conduct" >
        <Box overflow="scroll">
          <TextHero
            addNew={<ModalButton label="New Campaign" onClick={() => history.push(`${url}/new`)} />}
            title="Conduct"
            subTitle="Campaigns"
            body="This is the section where content for composing sequences will soon be."
          />
          <Box pad="medium" overflow="scroll">
            <Table 
              columns={(columns && configureColumns(columns, historyConfig))}
              data={(items && configureHistory(items))}
            />
          </Box>
        </Box>
      </Route>
    </Switch>
  );
}