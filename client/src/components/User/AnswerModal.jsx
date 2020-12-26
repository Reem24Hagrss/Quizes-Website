import { Radio, List } from "antd";
import {CheckCircleTwoTone} from '@ant-design/icons'
import { useEffect } from "react";
import axios from 'axios'

export const AnswerModal = ({ answer, data, test }) => {
  const goodAnswer = data.filter(item => answer[item.id] === item.answer )
  useEffect(async ()=>{
    const userId = localStorage.getItem('userId')
    const values = {
      userID: userId,
      testID: test,
      grade: goodAnswer.length+'/'+data.length
    }
    axios.post('/addusertest',values).then(res =>{
      console.log(res);
    })
    axios.get('/finishtest/'+userId+'/'+test)
  })
  return (
    <div className='answerModal'>
      <div className='grade'>
          { goodAnswer.length > data.length/2 ?
              <div className='success'>
                Grade : {goodAnswer.length} / {data.length}
              </div>
            :
              <div className='fail'>
                Grade : {goodAnswer.length} / {data.length}
              </div>
          }
      </div>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={item =>
          answer[item.id] === item.answer ?
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<CheckCircleTwoTone twoToneColor="#52c41a" />}
              title={item.question}
              description={
                <Radio.Group value={item.answer} className='success'>
                  <Radio value={item.choise1}>{item.choise1}</Radio>
                  <Radio value={item.choise2}>{item.choise2}</Radio>
                  <Radio value={item.choise3}>{item.choise3}</Radio>
                  <Radio value={item.choise4}>{item.choise4}</Radio>
                </Radio.Group>
              }
            />
          </List.Item>
          :
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<CheckCircleTwoTone twoToneColor="#eb2f96" />}
              title={item.question}
              description={
                <>
                { item.choise1 === item.answer ?
                  <Radio checked className='success'>{item.choise1}</Radio>
                  :
                  item.choise1 === answer[item.id] ?
                  <Radio checked className='fail'>{item.choise1}</Radio>
                  :
                  <Radio >{item.choise1}</Radio>
                }
                { item.choise2 === item.answer ?
                  <Radio checked className='success'>{item.choise2}</Radio>
                  :
                  item.choise2 === answer[item.id] ?
                  <Radio checked className='fail'>{item.choise2}</Radio>
                  :
                  <Radio >{item.choise2}</Radio>
                }
                { item.choise3 === item.answer ?
                  <Radio checked className='success'>{item.choise3}</Radio>
                  :
                  item.choise3 === answer[item.id] ?
                  <Radio checked className='fail'>{item.choise3}</Radio>
                  :
                  <Radio >{item.choise3}</Radio>
                }
                { item.choise4 === item.answer ?
                  <Radio checked className='success'>{item.choise4}</Radio>
                  :
                  item.choise4 === answer[item.id] ?
                  <Radio checked className='fail'>{item.choise4}</Radio>
                  :
                  <Radio >{item.choise4}</Radio>
                }
                </>
              }
            />
          </List.Item>
        }
      />
    </div>
  );
};
