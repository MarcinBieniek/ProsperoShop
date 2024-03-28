import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Rejestracja from './pages/Rejestracja';
import Profil from './pages/Profil';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rejestracja' element={<Rejestracja />} />
        <Route element={<PrivateRoute />} >
          <Route path='/profil' element={<Profil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
