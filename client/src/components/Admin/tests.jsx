import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { AddTest } from './Modals';
import axios from 'axios';
import './style.css';
import TestQuestions from './TestQuestions';

function Tests() {
  const [visible, setVisible] = useState(false);
  const [data,setData] = useState([])

  useEffect( async ()=>{
    await axios.get('/gettestsusers').then(res=>{
      setData(res.data);
      console.log(data);
    })
  },[]);

  const onCreate = (values) => {
    axios.post('/addtest',values).then(res =>{
      setData(prevState =>{
        return [...prevState, values]
      })
    })
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const [view, setView] = useState({ table:true,display:false , test: {}})
  const deleteTest = (id) =>{
    axios.delete('/deletetest/'+id).then(res =>{
      setData(data.filter(item=> item.id !== id ))
      console.log(data);
    })
  }
  const openTest = (test) =>{
    setView({
      table: false,
      display: true,
      test: test
    })
  }
  const openTable = () =>{
    setView({
      table: true,
      display: false,
    })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text,record) => (<a  onClick={()=>openTest(record)}> {record.name} </a>)
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (record) => (<a onClick={()=>deleteTest(record.id)}>Delete</a>)
    },
  ];
    return (
      <div className="tests">

        { view.table && <Table dataSource={data} columns={columns} /> }
        { view.table && <Button type='primary' shape='round' className='addNew' onClick={()=>{setVisible(true)}}> Add New Test </Button> }
        { view.display && <TestQuestions test={view.test} method={openTable} />}
        <AddTest
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      </div>
    );
  }
  
  export default Tests;
  