import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
