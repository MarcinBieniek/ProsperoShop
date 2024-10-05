import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Produkt from "./pages/Produkt";
import User from "./pages/User";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import AddUser from "./pages/Admin/AddUser";
import Error from "./pages/Error";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rejestracja' element={<Rejestracja />} />
        <Route path='/koszyk' element={<Koszyk /> } />
        <Route path='/sklep' element={<Sklep /> } />
        <Route path='/produkt/:produktId' element={<Produkt /> } />
        <Route path='/user' element={<User />} />
        <Route path='/error' element={<Error />} />

        <Route element={<PrivateRoute />} >
          <Route path='/profil' element={<Profil />} />
          <Route path='/create-listing' element={<CreateListing />}/>
          <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path='/admin' element={<AdminLayout /> }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='users/add-user' element={<AddUser />} />
          </Route>
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
