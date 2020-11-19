import React, { useState, useEffect } from 'react';
import { Box, Button, Tab, Tabs, Text, Image } from 'grommet';
import { TextHero, Modal, Table } from '../../components'
import { composeIndexSceneData } from './data'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const ComposeSequences = ({
  addNew
}) => {
  const {columns, data} = composeIndexSceneData

  return (
    <Box>
      <TextHero
        addNew={addNew}
        title="Compose"
        subTitle="Sequences"
        body="This is the section where content for composing sequences will soon be."
      />
      <Box pad="medium">
        <Table columns={columns} data={data}/>
      </Box>
    </Box>
  );
}