import {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link, NavLink} from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const {user} = useContext(UserContext);

  return (
    <Navbar bg='light' expand='lg' className='nav-css'>
      <Container fluid className='col-lg-9'>
        <Navbar.Brand href='#home'>
          <img
            src={require('../images/logo.jpg')}
            style={{
              maxWidth: '50%',
              maxHeight: '50%',
              objectFit: 'cover'
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={NavLink} to='/'>
              Home
            </Nav.Link>
            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={NavLink} to='/products'>
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to='/addProduct'>
                    Add Product
                  </Nav.Link>
                  <Nav.Link as={Link} to='/logout'>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to='/products'>
                    Products
                  </Nav.Link>
                  <Nav.Link as={Link} to='/profile'>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to='/logout'>
                    Logout
                  </Nav.Link>
                  <Nav.Link as={Link} to='/cart'>
                    Cart
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to='/products'>
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
