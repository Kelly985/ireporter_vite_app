import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
// import SignUp from './components/pages/SignUp';
import Signup from './components/signup';
import LoginForm from './components/login';
import AdminPage from './ADMIN_COMPONENT/AdminPage';
import UserPage from './User Components/UserPage';
import ReportForm from './User Components/ReportForm';
import Reports from './ADMIN_COMPONENT/AdminReports';

import Reportlist from './User Components/Reportlist';
import Map from './User Components/Status';
import Dashboard from './User Components/Dashboard';
import Donation from './components/donate';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        
        <Routes>

          <Route path='/' exact element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/adminpage' element={<AdminPage />} />
          <Route path='/reportform' element={<ReportForm />} />
          <Route path='/reportlist' element={<Reportlist />} />
          <Route path='/donate' element={<Donation />} />
  
          <Route path='/map' element={<Map />} />
          <Route path='/userpage' exact element={<UserPage />} />
          <Route path='/reportform' exact element={<ReportForm />} />
          <Route path='/allreports' exact element={<Reports />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;