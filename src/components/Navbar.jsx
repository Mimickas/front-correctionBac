import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const AppNavbar = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Correcteur Étudiant</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/notes">Notes</Nav.Link>
              <Nav.Link as={Link} to="/parametres">Paramètres</Nav.Link>
              <Nav.Link as={Link} to="/note-finale">Note Finale</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default AppNavbar;