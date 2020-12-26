import { Table } from 'antd';
import axios from 'axios'
import { useEffect, useState } from 'react';
import './style.css';

function Previous() {
  const [data,setData] = useState([])

  useEffect( async()=>{
    const userId = localStorage.getItem('userId')
    await axios.get('/getuserTests/'+userId).then(res=>{
      setData(res.data);
    })
  },[])

  
  const columns = [
    {
      title: 'Test',
      dataIndex: 'test',
      key: 'test',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
  ];
    return (
      <div className="pervious">
        <Table dataSource={data} columns={columns} />
      </div>
    );
  }
  
  export default Previous;
  