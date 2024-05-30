// App.js
import React from 'react';
import Home from './components/Home.js';
import AddFlower from './components/AddFlower.jsx';
import DeleteFlower from './components/DeleteFlower.jsx';
import Flowers from './components/Flowers.jsx'
import Login from './components/Login.js'
import Register from './components/Register.js'
import { BrowserRouter as Router, Route, Routes,  useLocation } from 'react-router-dom';
import TopHoverNavbar from './components/TopHoverNavbar';
import { useEffect } from 'react';

function checkInternetConnection() {
  fetch('http://localhost:3000/flowers')
      .then(response => {
          if (response.ok) {
              console.log('Internet connection is up');
          } else {
              console.log('Internet connection is down');
          }
      })
      .catch(error => {
          console.error('Error occurred while checking internet connection:', error);
          console.log('Internet connection is down');
      });
}


function AppWithNavbar() {
let location = useLocation();

return (
  <>
    {location.pathname === '/' && <TopHoverNavbar />}
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path="/add-flower" element={<AddFlower />} /> {/* Route for adding flowers */}
      <Route path="/delete-flower" element={<DeleteFlower />} /> {/* Route for deleting flowers */}
      <Route path="/flowers" element={<Flowers />} />
    </Routes>
  </>
);  
}

function App() {
useEffect(() => {
checkInternetConnection();
}, []);

return (
  <Router>
    <AppWithNavbar />
  </Router>
);


}

export default App;
