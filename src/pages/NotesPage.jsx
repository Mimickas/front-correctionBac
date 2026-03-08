import { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { noteService } from '../services/noteService';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await noteService.getAllNotes();
      setNotes(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des notes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette note ?')) {
      try {
        await noteService.deleteNote(id);
        fetchNotes(); // Rafraîchir la liste
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
        <h2>Liste des notes</h2>
        <Button as={Link} to="/notes/nouveau" variant="success">
          Nouvelle note
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Étudiant</th>
            <th>Matière</th>
            <th>Correcteur</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <motion.tr
              key={note.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td>{note.id}</td>
              <td>{note.etudiant?.nom || 'N/A'}</td>
              <td>{note.matiere?.nom || 'N/A'}</td>
              <td>{note.correcteur?.nom || 'N/A'}</td>
              <td>{note.note}</td>
              <td>
                <Button
                  as={Link}
                  to={`/notes/modifier/${note.id}`}
                  size="sm"
                  variant="warning"
                  className="me-2"
                >
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(note.id)}
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

export default NotesPage;