import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Movies from './components/movies/Movies';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      {/* {pathname !== "/login" && pathname !== "/register" ? <Header /> : null} */}
      <div className="container">
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
