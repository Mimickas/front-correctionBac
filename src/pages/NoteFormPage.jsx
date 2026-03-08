import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { noteService } from '../services/noteService';

const NoteFormPage = () => {
  const { id } = useParams(); // Pour modification
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    etudiantId: '',
    matiereId: '',
    correcteurId: '',
    note: '',
  });

  const [etudiants, setEtudiants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [correcteurs, setCorrecteurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadInitialData();
    if (isEditing) loadNote();
  }, [id]);

  const loadInitialData = async () => {
    try {
      const [etudiantsRes, matieresRes, correcteursRes] = await Promise.all([
        noteService.getEtudiants(),
        noteService.getMatieres(),
        noteService.getCorrecteurs(),
      ]);
      setEtudiants(etudiantsRes.data);
      setMatieres(matieresRes.data);
      setCorrecteurs(correcteursRes.data);
    } catch (error) {
      alert('Erreur chargement des données');
    }
  };

  const loadNote = async () => {
    try {
      setLoading(true);
      const response = await noteService.getNoteById(id);
      const note = response.data;
      setFormData({
        etudiantId: note.etudiant?.id || '',
        matiereId: note.matiere?.id || '',
        correcteurId: note.correcteur?.id || '',
        note: note.note || '',
      });
    } catch (error) {
      alert('Erreur chargement de la note');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditing) {
        await noteService.updateNote(id, formData);
      } else {
        await noteService.createNote(formData);
      }
      navigate('/notes');
    } catch (error) {
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <h2>{isEditing ? 'Modifier' : 'Ajouter'} une note</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Étudiant</Form.Label>
                <Form.Select
                  name="etudiantId"
                  value={formData.etudiantId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  {etudiants.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nom}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Matière</Form.Label>
                <Form.Select
                  name="matiereId"
                  value={formData.matiereId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  {matieres.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nom}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Correcteur</Form.Label>
                <Form.Select
                  name="correcteurId"
                  value={formData.correcteurId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  {correcteurs.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nom}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/notes')} className="ms-2">
            Annuler
          </Button>
        </Form>
      </Container>
    </motion.div>
  );
};

export default NoteFormPage;