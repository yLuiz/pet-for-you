import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Profile from './components/pages/User/Profile';
import Home from './components/pages/Home';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import PetDetails from './components/pages/Pet/PetDetails';
import MyAdoptions from './components/pages/Pet/MyAdoptions';


/* 
  Changes on react-router 5.0 to react-router 6.0;
   - useHistory to useNavigate;
   - Switch to Routes
*/

/* 

toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

*/


import { UserProvider } from './context/UserContext';
import PrivateRoutes from './guards/Private';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (

    <div className="App">

      <ToastContainer 
          limit={2}
          autoClose={2500}
          hideProgressBar={false}
      />
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/' element={ <PrivateRoutes />}>
              <Route path='/user/profile' element={ <Profile />} />
              <Route path='/' element={ <Home />} /> 
              <Route path='/allUsers' element={ <Navigate to="/users" />} />
              <Route path='/pet/mypets' element={ <MyPets /> } />
              <Route path='/pet/add' element={ <AddPet /> } />
              <Route path='/pet/edit/:id' element={ <EditPet /> } />
              <Route path='/pet/:id' element={ <PetDetails /> } />
              <Route path='/pet/myadoptions' element={ <MyAdoptions /> } />
              <Route path='*' element={<Navigate to='/' />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
