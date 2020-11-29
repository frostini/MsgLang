import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from 'grommet';
import { DeleteModal, EditModal, Modal, TextHero, Table } from '../../components'
import { configureColumns, tableConfig, configureData, QUERY } from './data'
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const MessagesIndexScene = ({
  addNew
}) => {

  const history = useHistory()
  const { url, path } = useRouteMatch()

  const { REACT_APP_TOKEN: TOKEN } = process.env
  const [sequences, setSequences] = useState({})
  const { columns, items } = sequences
  
  useEffect(() => {
    monday.setToken(TOKEN)
    monday.api(QUERY).then((res) => {
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
      <Route exact path={`${path}/new`}>
        <Modal 
          onClose={() => history.push(url)}
          config={{title: 'Messages'}}
        />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <EditModal 
          onClose={() => history.push(url)}
          config={{title: 'Edit'}}
        />
      </Route>
      <Route path={`${path}/:id/delete`}>
        <DeleteModal
          onClose={() => history.push(url)}
          config={{title: 'Delete'}}
        />
      </Route>
      <Route exact path="/compose/messages" >
        <Box>
          <TextHero
            addNew={<ModalButton label="New Message" onClick={() => history.push(`${url}/new`)} />}
            title="Compose"
            subTitle="Messages"
            body="This is the section where content for composing sequences will soon be."
          />
          <Box pad="medium">
            <Table 
              columns={(columns && configureColumns(columns, tableConfig))}
              data={(items && configureData(items))}
            />
          </Box>
        </Box>
      </Route>
    </Switch>
  );
}