import React from "react";
import { Box } from "grommet";
import { ComposeMessages } from './ComposeMessages'
import { MessagesIndexScene } from './MessagesIndexScene'
import { ComposeSequences } from './ComposeSequences'

export const Compose = () => {

  return (
      <Box pad="medium" fill="horizontal">
        <MessagesIndexScene />
      </Box>
  )
};
export {ComposeSequences, ComposeMessages}