import {Menu, Layout} from 'antd'
import { useState } from 'react';
import Questions from './Questions';

import './style.css';
import Tests from './tests';
import Users from './users';

const {Sider, Content} = Layout

function Admin() {
  const [view,setView] = useState({question:true,tests:false,users:false})
  const viewQuestions = () =>{
    setView({
      question:true,
      tests:false,
      users:false
    })
  }
  const viewTests = () =>{
    setView({
      question:false,
      tests:true,
      users:false
    })
  }
  const viewUsers = () =>{
    setView({
      question:false,
      tests:false,
      users:true
    })
  }
  return (
    <div className="adminPage">
      <Layout>
        <Sider
          breakpoint="sm"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" onClick={viewQuestions}>
              Questions
            </Menu.Item>
            <Menu.Item key="2" onClick={viewTests}>
              Tests
            </Menu.Item>
            <Menu.Item key="3"onClick={viewUsers}>
              Users
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className='content'>
          { view.question && <Questions /> }
          { view.tests &&  <Tests />}
          { view.users &&  <Users />}
        </Content>
      </Layout>
    </div>
  );
}

export default Admin;
