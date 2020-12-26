import { Button, List, Radio} from 'antd';
import React,{ useEffect, useState } from 'react';
import {AddQuestion} from './Modals'
import axios from 'axios'
import './style.css';

function Questions() {
  const [visible, setVisible] = useState(false);
  const [data,setData] = useState([])

  useEffect( async ()=>{
    await axios.get('/getquestions').then(res=>{
      setData(res.data);
    })
  },[]);
  const deleteQuestion = (id) =>{
    console.log(data);
    console.log(id);
    axios.delete('/deletequestion/'+id).then(res =>{
      setData(data.filter(item=> item._id !== id ))
      console.log(data);
    })
  }
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    axios.post('/addquestion',values).then(res =>{
      setData(prevState =>{
        return [...prevState, values]
      })
    })
    setVisible(false);
  };

  return (
      <div className="qustions">
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item
              key={item._id}
              actions={[<a onClick={()=>deleteQuestion(item._id)} key="list-loadmore-edit">Delete</a>]}
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

        <AddQuestion
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
        
      </div>
    );
  }
  
  export default Questions;
  