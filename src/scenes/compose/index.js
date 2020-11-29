import React from "react";
import { Box } from "grommet";
import { ComposeMessages } from './ComposeMessages'
import { MessagesIndexScene } from './MessagesIndexScene'
import { ComposeSequences } from './ComposeSequences'
import { DeleteModal, EditModal, Modal } from '../../components'
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";

export const Compose = () => {
  const history = useHistory()
  const { url, path } = useRouteMatch()
  
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
      <Box pad="medium" fill="horizontal">
        <MessagesIndexScene />
      </Box>
    </Switch>
  )
};
export {ComposeSequences, ComposeMessages}