import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

import AddProduct from './pages/AddProduct';
//import AdminPage from './pages/AdminPage';
import AppNavbar from './components/AppNavbar';
import Cart from './pages/Cart';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Profile from './pages/Profile';
import Register from './pages/Register';

import './App.css';
import './index.css';
import {UserProvider} from './UserContext';

function App() {
  const [user, setUser] = useState({access: localStorage.getItem('token')});

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (typeof data.user !== 'undefined') {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />

        <Container fluid className='col-lg-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addProduct' element={<AddProduct />} />
            {/*<Route path='/adminPage' element={<AdminPage />} />*/}
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route
              path='/products/:productId'
              element={<ProductView />}
            />
            <Route path='/products' element={<Products />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;

