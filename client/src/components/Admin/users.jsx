import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { AddUser } from './Modals';
import axios from 'axios';
import './style.css';

function Users() {
  const [visible, setVisible] = useState(false);
  const [data,setData] = useState([])

  useEffect( async ()=>{
    await axios.get('/getusers').then(res=>{
      setData(res.data);
      console.log(data);
    })
  },[]);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    axios.post('/adduser',values).then(res =>{
      setData(prevState =>{
        return [...prevState, values]
      })
    })
    setVisible(false);
  };

  const deleteUser = (id) =>{
    axios.delete('/deleteuser/'+id).then(res =>{
      setData(data.filter(item=> item._id !== id ))
      console.log(data);
    })
    console.log(id);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => <a onClick={()=>deleteUser(record._id)} >Delete</a>
    },
  ];
    return (
      <div className="users">
        <Table dataSource={data} columns={columns} />
        <Button type='primary' shape='round' className='addNew' onClick={()=>{setVisible(true)}} > 
          Add New user
        </Button>

        <AddUser
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      </div>
    );
  }
  
  export default Users;
  