import React from "react";
import { Box } from "grommet";
import { CampaignsIndex } from './CampaignsIndex'
import { NewCampaign } from './NewCampaign'
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";

export const Conduct = () => {
  const history = useHistory()
  const { url, path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <NewCampaign 
          onClose={() => history.push(url)}
          config={{title: 'Campaign'}}
        />
      </Route>
      <Box pad="medium" fill={true} overflow="scroll">
        <CampaignsIndex />
      </Box>
    </Switch>
  )
};