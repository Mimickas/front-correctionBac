import { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { noteService } from '../services/noteService';
import { authService } from '../services/authService';

const NoteFinalePage = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [selectedEtudiant, setSelectedEtudiant] = useState('');
  const [selectedMatiere, setSelectedMatiere] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [etudiantsRes, matieresRes] = await Promise.all([
        noteService.getEtudiants(),
        noteService.getMatieres(),
      ]);
      setEtudiants(etudiantsRes.data);
      setMatieres(matieresRes.data);
    } catch (err) {
      setError('Erreur chargement des données');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEtudiant || !selectedMatiere) {
      setError('Veuillez sélectionner un étudiant et une matière');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await authService.mijeryNoteFinale(
        parseInt(selectedEtudiant),
        parseInt(selectedMatiere)
      );
      setResult(response.data);
    } catch (err) {
      setError('Erreur lors du calcul');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Calculer la note finale</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Étudiant</Form.Label>
          <Form.Select
            value={selectedEtudiant}
            onChange={(e) => setSelectedEtudiant(e.target.value)}
            required
          >
            <option value="">Sélectionner un étudiant</option>
            {etudiants.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nom}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Matière</Form.Label>
          <Form.Select
            value={selectedMatiere}
            onChange={(e) => setSelectedMatiere(e.target.value)}
            required
          >
            <option value="">Sélectionner une matière</option>
            {matieres.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nom}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Calculer'}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center">
            <Card.Header>Résultat</Card.Header>
            <Card.Body>
              <Card.Title>{result.nom}</Card.Title>
              <Card.Text>
                <strong>Matière :</strong> {result.matiere}<br />
                <strong>Note finale :</strong> {result.note}
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NoteFinalePage;