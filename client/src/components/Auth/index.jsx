import {Tabs} from 'antd';
import StudentLogin from './StudentLogin';
 
import './style.css';
import TeacherLogin from './TeacherLogin';

const {TabPane} = Tabs

function Auth() {
    return (
      <div className='loginPage'>
        <h1>
          Hello In Quizes Website
        </h1>
        <div className='loginBox'>
          <Tabs defaultActiveKey="1" type='card' centered>
            <TabPane tab="Teacher" key="1">
              <TeacherLogin/>
            </TabPane>
            <TabPane tab="Student" key="2">
              <StudentLogin />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
  
  export default Auth;
  