import { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { parametreService } from '../services/parametreService';

const ParametresPage = () => {
  const [parametres, setParametres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchParametres();
  }, []);

  const fetchParametres = async () => {
    try {
      setLoading(true);
      const response = await parametreService.getAllParametres();
      setParametres(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce paramètre ?')) {
      try {
        await parametreService.deleteParametre(id);
        fetchParametres(); // Rafraîchir la liste
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h2>Liste des paramètres</h2>
        <Button as={Link} to="/parametres/nouveau" variant="success">
          Nouveau paramètre
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Opérateur</th>
            <th>Matière</th>
            <th>Résolution</th>
            <th>Diff</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parametres.map((param) => (
            <motion.tr
              key={param.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td>{param.id}</td>
              <td>{param.operateur?.operateur || 'N/A'}</td>
              <td>{param.matiere?.nom || 'N/A'}</td>
              <td>{param.resolution?.resolution || 'N/A'}</td>
              <td>{param.diff}</td>
              <td>
                <Button
                  as={Link}
                  to={`/parametres/modifier/${param.id}`}
                  size="sm"
                  variant="warning"
                  className="me-2"
                >
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(param.id)}
                >
                  Supprimer
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default ParametresPage;