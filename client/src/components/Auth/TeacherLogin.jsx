import { Form, Input, Button} from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import './style.css';


function TeacherLogin() {
  const [data,setData] = useState({password:''})
  const history = useHistory()
  const setPassword = (e)=>{
    setData({
      password: e.target.value
    })
  }
  const handleSubmit = ()=>{
    $.ajax({
      url: '/adminlogin',
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        history.push('/admin')
        return;
      },
      error: (error) => {
        alert('Please enter right password')
        return;
      }
    })
  }

    return (
      <div className='loginForm'>
          <Form
            onFinish={handleSubmit}
          >
            <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
                value={data.password}
              >
                  <Input.Password
                    size='middle'
                    value={data.password}
                    onChange={(e)=>{setPassword(e)}} 
                  />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type='primary' shape='round'>
                    Login
                </Button>
              </Form.Item>
          </Form>
          
      </div>
    );
  }
  
  export default TeacherLogin;
  