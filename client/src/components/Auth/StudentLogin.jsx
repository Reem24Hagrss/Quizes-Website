import { Form, Input, Button} from 'antd';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import $ from 'jquery';
import './style.css';


function StudentLogin() {
  const [data,setData] = useState({ email:'', password:'' })
  const history = useHistory();
  const handleChange= (e) =>{
    setData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  
  const handleSubmit = ()=>{
    $.ajax({
      url: '/userlogin',
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        localStorage.setItem('userId',result._id)
        history.push('/user')
        return;
      },
      error: (error) => {
        alert('The account is not exist')
        return;
      }
    })
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
    return (
      <div className='loginForm'>
          <Form
              {...layout}
              name="basic"
              onFinish={handleSubmit}
          >
            <Form.Item
              label='E-mail'
              name='email'
              rules={[{ required: true, message: 'Please input your password!' }]}
              value={data.email}
            >
                <Input 
                  size='middle' 
                  type='email'
                  value={data.email}
                  name='email'
                  onChange={(e)=>{handleChange(e)}} 
                />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
              value={data.password}
            >
                <Input.Password
                  size='middle'
                  value={data.password}
                  name='password'
                  onChange={(e)=>{handleChange(e)}} 
                />
            </Form.Item>
            <Form.Item>
              <Button type='primary' shape='round' htmlType='submit'>
                  Login
              </Button>
            </Form.Item>
          </Form>
          
      </div>
    );
  }
  
  export default StudentLogin;
  