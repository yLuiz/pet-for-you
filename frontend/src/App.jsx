import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Container from './components/layout/Container';
import Message from './components/layout/Message';
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

import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import MyAdoptions from './components/pages/Pet/MyAdoptions';
import MyPets from './components/pages/Pet/MyPets';
import PetDetails from './components/pages/Pet/PetDetails';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Navbar />
          <Message />
          <Container>
            <Routes>
              <Route path='user/profile' element={ <Profile />}></Route>
              <Route path='/' element={ <Home />}></Route>
              <Route path='/login' element={ <Login />}></Route>
              <Route path='/register' element={ <Register />}></Route>
              <Route path='/allUsers' element={ <Navigate to="/users" />}></Route>
              <Route path='/pet/mypets' element={ <MyPets /> }></Route>
              <Route path='/pet/add' element={ <AddPet /> }></Route>
              <Route path='/pet/edit/:id' element={ <EditPet /> }></Route>
              <Route path='/pet/:id' element={ <PetDetails /> }></Route>
              <Route path='/pet/myadoptions' element={ <MyAdoptions /> }></Route>
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </Container>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
  