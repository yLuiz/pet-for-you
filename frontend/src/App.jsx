import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile';

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

import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import MyAdoptions from './components/pages/Pet/MyAdoptions';
import MyPets from './components/pages/Pet/MyPets';
import PetDetails from './components/pages/Pet/PetDetails';
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
            <Route element={<PrivateRoutes />}>
              <Route path='user/profile' element={ <Profile />} />
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

    // <div className="App">
    //   <Router>
    //     <UserProvider>
    //       <Navbar />
    //       <Message />
    //       <Container>
    //         <Routes>
    //           <Route path='/login' element={ <Login />} />
    //           <Route path='/register' element={ <Register />} />
    //           <Route path='user/profile' element={ <Profile />} />
    //           <Route path='/' element={ <Home />} />
    //           <Route path='/allUsers' element={ <Navigate to="/users" />} />
    //           <Route path='/pet/mypets' element={ <MyPets /> } />
    //           <Route path='/pet/add' element={ <AddPet /> } />
    //           <Route path='/pet/edit/:id' element={ <EditPet /> } />
    //           <Route path='/pet/:id' element={ <PetDetails /> } />
    //           <Route path='/pet/myadoptions' element={ <MyAdoptions /> } />
    //           <Route path='*' element={<Navigate to='/' />} />
    //         </Routes>
    //       </Container>
    //     </UserProvider>
    //   </Router>
    // </div>
  );
}

export default App;
