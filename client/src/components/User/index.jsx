import { Row, Col, Button} from 'antd';
import { useState } from 'react';
import NewTest from './NewTest';
import Previous from './Previous';
import './style.css';

function User() {
  const [view, setview] = useState({new:false,previous:true});
  const viewNew = () =>{
    setview({
      new:true,
      previous:false
    })
  }
  const viewPrev = () =>{
    setview({
      new:false,
      previous:true
    })
  }

    return (
      <div className="userPage">
        <Row gutter={8}>
          <Col span={12}> 
              <Button type='primary' shape='round' onClick={viewPrev}>
                      Previous tests
              </Button>
          </Col>
          <Col span={12}>
              <Button type='primary' shape='round' onClick={viewNew}>
                      new test
              </Button>
          </Col>
        </Row>
        <Row className='content'>
           { view.previous && <Previous /> }
           { view.new && <NewTest />}
        </Row>
      </div>
    );
  }
  
  export default User;
  