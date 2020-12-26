import { Form, Button, Radio, Divider, Select} from 'antd';
import { useEffect, useState } from 'react';
import { AnswerModal } from './AnswerModal';
import axios from 'axios'

import './style.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

function NewTest() {

  const [view, setView] = useState(false);
  const [start, setStart] = useState(false);
  const [data, setData] = useState(false);
  const [answer,setAnswer] = useState({})
  const [tests,setTests] = useState([])
  const [testId,setTestId] = useState()
  useEffect( async()=>{
    const userId = localStorage.getItem('userId')
    let prev = []
    let all =[]
    await axios.get('/getuserTests/'+userId).then(res=>{
      prev = res.data
      console.log(prev);
    })
    await axios.get('/gettests').then(res=>{
      all = res.data
      setTests(all)
      if(prev.length !== 0){
        prev.forEach(item => {
          all = all.filter(test => test._id !== item.key) 
          console.log(all);
        })
        setTests(all)
      }
      // console.log(tests);
    })
    
  },[])

  const startTest = async (values) =>{
    const id = values.testId
    setTestId(id)
    await axios.get('/gettestquestion/'+id).then(res=>{
      setData(res.data);
      setStart(true)
    })
  }
  const handleSubmit = (values)=>{
    setAnswer(values)
    setView(true);
  }
  const returnBack = () =>{
    setView(false);
    setStart(false)
  }
    return (
      <div className="test">
        { view &&
          <div className='back'> 
            <Button type='primary' shape='round' size='small' className='back' onClick={returnBack}>
            <ArrowLeftOutlined />
              Back
            </Button> 
          </div> 
        }
        { !view &&
        <Form onFinish={startTest} name='basic' layout='vertical'>
          <Form.Item
            name="testId"
            label="Test"
            rules={[{ required: true,message: 'Please select the test!',}]}
          >
            <Select
                placeholder="Select a test"
                allowClear
            >
                {tests.map(item =>{
                  return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                })}
            </Select>
          </Form.Item>
          <Form.Item>
              <Button type='primary' shape='round' htmlType='submit'>
                  submit
              </Button>
          </Form.Item>
        </Form>
        }
        { start && !view &&
        <Form onFinish={handleSubmit} name="basic">

          {data.map(item =>{
            return(
              <> 
                <Form.Item
                key={item.id}
                label={item.question}
                rules={[{ required: true, message: 'Please answer the question!' }]}
                name={item.id}
                >
                  <Radio.Group>
                    <Radio value={item.choise1}>{item.choise1}</Radio>
                    <Radio value={item.choise2}>{item.choise2}</Radio>
                    <Radio value={item.choise3}>{item.choise3}</Radio>
                    <Radio value={item.choise4}>{item.choise4}</Radio>
                  </Radio.Group>
                </Form.Item>
                <Divider />
              </>
            )
          })}
          <Form.Item>
              <Button type='primary' shape='round' htmlType='submit'>
                  submit
              </Button>
            </Form.Item>
        </Form>
        }
        {view &&
        <AnswerModal 
            answer={answer}
            data={data}
            test = {testId}
        />     
      } 
      </div>
    );
  }
  
  export default NewTest;
  