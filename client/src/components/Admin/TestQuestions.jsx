import { Breadcrumb, Button, List, Radio} from 'antd';
import React,{ useEffect, useState } from 'react';
import axios from 'axios'
import {AddTestQuestion} from './Modals'
import './style.css';

function TestQuestions(props) {
  const [visible, setVisible] = useState(false);

  const [data,setData] = useState([])

  useEffect( async ()=>{
    const id = props.test.id
    await axios.get('/gettestquestion/'+id).then(res=>{
      setData(res.data);
    })
  },[]);

  const onCreate = async (values) => {
    await axios.post('/addtestquestion',{testID:props.test.id, questionId: values.questionId}).then(res =>{
    })
    await axios.get('/gettestquestion/'+props.test.id).then(res=>{
      setData(res.data);
    })
    setVisible(false);
  };

  const deleteQuestion = (id) =>{
    console.log(data);
    console.log(id);
    axios.delete('/deletetestquestion/'+id).then(res =>{
      setData(data.filter(item=> item.id !== id ))
      console.log(data);
    })
  }

    return (
      <div className="qustions">
        <Breadcrumb style={{ margin: '16px 0', textAlign:'left' }}>
          <Breadcrumb.Item><Button type='link' onClick={()=>props.method()}> Tests </Button></Breadcrumb.Item>
          <Breadcrumb.Item>{props.test.name}</Breadcrumb.Item>
        </Breadcrumb>
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item
            key = {item.id}
            actions={[<a onClick={()=>deleteQuestion(item.id)} key="list-loadmore-edit">Delete</a>]}
            >
              <List.Item.Meta
                title={item.question}
                description={
                  <Radio.Group value={item.answer} disabled>
                    <Radio value={item.choise1}>{item.choise1}</Radio>
                    <Radio value={item.choise2}>{item.choise2}</Radio>
                    <Radio value={item.choise3}>{item.choise3}</Radio>
                    <Radio value={item.choise4}>{item.choise4}</Radio>
                  </Radio.Group>
                }
              />
            </List.Item>
          )}
        />
        <Button type='primary' shape='round' className='addNew' onClick={()=>{setVisible(true)}}> 
          Add New question 
        </Button>
        <AddTestQuestion
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      </div>
    );
  }
  
  export default TestQuestions;
  