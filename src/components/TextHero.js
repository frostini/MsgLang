import React, { useState } from "react";
import { Box, Heading, Markdown, Paragraph, Text } from "grommet";

export const TextHero = ({ 
  title,
  body,
  addNew,
  subTitle
}) => (
  <Box flex align="start" direction="column">
    <Box flex align="end" pad="small" width="large">
      {addNew}
    </Box>
    <Box margin="none" direction="row" justify="between" align="center">
      <Heading textAlign="start" level="2">
        {title}
      </Heading>
      <Text margin="small" size="xxlarge" textAlign="center" textAlign="start" weight="200" level="2">
        {subTitle}
      </Text>
    </Box>
    {/* <Paragraph textAlign="start" color="dark-5">
      <Markdown>
        {body}
      </Markdown>
    </Paragraph> */}
  </Box>
)