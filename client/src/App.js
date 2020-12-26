import {BrowserRouter ,Route } from 'react-router-dom';
import Auth from './components/Auth/index';
import Admin from './components/Admin/index';
import User from './components/User/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route exact path='/' component={Auth} />
          <Route path='/admin' component={Admin} />
          <Route path='/user' component={User} />
      </BrowserRouter>
      <div className='footer'>
        Created by Full stack developer Reem Hagrss @2020
      </div>
    </div>
  );
}

export default App;
