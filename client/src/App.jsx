import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import Home from './pages/Home';
import Login from './pages/Login';
import Rejestracja from './pages/Rejestracja';
import Profil from './pages/Profil';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Koszyk from "./pages/Koszyk";
import Sklep from "./pages/Sklep";
import Footer from "./components/Footer";


const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rejestracja' element={<Rejestracja />} />
        <Route path='/koszyk' element={<Koszyk /> } />
        <Route path='/sklep' element={<Sklep /> } />
        <Route element={<PrivateRoute />} >
          <Route path='/profil' element={<Profil />} />
          <Route path='/create-listing' element={<CreateListing />}/>
          <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
