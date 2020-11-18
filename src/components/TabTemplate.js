import React, { useState, useEffect } from 'react';
import { Box, Button, Tab, Tabs, Text, Image } from 'grommet';
import { TextHero, Modal, Table } from '../components'
import { composeIndexSceneData } from '../scenes/compose/data'
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const  TabTemplate = () => {
  const [answer, setAnswer] = useState(false);
  const [hello, setHello] = useState(false);
  const [goodbye, setGoodbye] = useState(false);
  const {columns, data} = composeIndexSceneData
  var yee = false
  const toggleState = (setState) =>  {
    setState(state => !state )
  }

  useEffect(()=>{
    monday.listen("context", res => {
      setAnswer(res.data)
    });
  })
  // console.log(`here is `+ yee)
  // console.log(`there is `+ testing)
  // monday.listen("settings", res => {
  //   this.setState({ settings: res.data });
  // });
  
  // monday.listen("context", res => {
  //   this.setState({context: res.data});
  //   console.log(res.data);
  //   monday.api(`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1) { name column_values { title text } } } }`,
  //     { variables: {boardIds: this.state.context.boardIds} }
  //   )
  //   .then(res => {
  //     this.setState({boardData: res.data});
  //   });
  // })




  const ModalButton = ({ label, onClick }) => (
    <Button 
      primary
      label={label}
      onClick={ onClick }
    />
  )

  

  return (
    <Box flex >
      <Tabs 
        fill={true}
        overflow="auto"
        alignControls='start'
        alignSelf='center'
      >
        <Tab title='Messages'>
        <TextHero
            addNew={<ModalButton label="New Message" onClick={() => toggleState(setHello)} />}
            title="Compose"
            subTitle="Messages"
            body="This is the section where content for composing messages will soon be."
          />
          <Box pad="medium">
            <Table columns={columns} data={data}/>
          </Box>
          <Box height="large" width="large">
            Here is the {answer.theme}
          </Box>
        </Tab>
        <Tab title='Sequences'>
          <TextHero
            addNew={<ModalButton label="New Sequence" onClick={() => toggleState(setGoodbye)}/>}
            title="Compose"
            subTitle="Sequences"
            body="This is the section where content for composing sequences will soon be."
          />
          <Box pad="medium" >
            <Table columns={columns} data={data}/>
          </Box>
        </Tab>
      </Tabs>
      {hello && <Modal onClose={() => toggleState(setHello)} />}
      {goodbye && <Modal onClose={() => toggleState(setGoodbye)} />}
    </Box>
  );
}