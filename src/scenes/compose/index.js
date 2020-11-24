import React from "react";
import { Box, Button, Heading } from "grommet";
import { TabTemplate } from "../../components"
import { ComposeMessages } from './ComposeMessages'
import { ComposeSequences } from './ComposeSequences'
import { configureColumns, tableConfig, configureData, QUERY } from './data'

export const Compose = () => {

  return (
      <Box pad="medium" fill="horizontal">
        <TabTemplate />
      </Box>
  )
};
export {ComposeSequences, ComposeMessages}