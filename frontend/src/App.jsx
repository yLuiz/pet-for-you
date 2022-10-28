import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Message from './components/layout/Message';

/* 
  Changes on react-router 5.0 to react-router 6.0;
   - useHistory to useNavigate;
   - Switch to Routes
*/

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
              <Route path='/' element={<Home />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/allUsers' element={<Navigate to="/users" />}></Route>
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
  