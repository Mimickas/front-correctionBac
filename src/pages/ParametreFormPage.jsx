import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { parametreService } from '../services/parametreService';

const ParametreFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    operateurId: '',
    matiereId: '',
    resolutionId: '',
    diff: '',
  });

  const [operateurs, setOperateurs] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [resolutions, setResolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadInitialData();
    if (isEditing) loadParametre();
  }, [id]);

  const loadInitialData = async () => {
    try {
      const [operateursRes, matieresRes, resolutionsRes] = await Promise.all([
        parametreService.getOperateurs(),
        parametreService.getMatieres(), // Note: c'est le endpoint /matieres-pour-parametre
        parametreService.getResolutions(),
      ]);
      setOperateurs(operateursRes.data);
      setMatieres(matieresRes.data);
      setResolutions(resolutionsRes.data);
    } catch (error) {
      alert('Erreur chargement des données');
    }
  };

  const loadParametre = async () => {
    try {
      setLoading(true);
      const response = await parametreService.getParametreById(id);
      const param = response.data;
      setFormData({
        operateurId: param.operateur?.id || '',
        matiereId: param.matiere?.id || '',
        resolutionId: param.resolution?.id || '',
        diff: param.diff || '',
      });
    } catch (error) {
      alert('Erreur chargement du paramètre');
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
        await parametreService.updateParametre(id, formData);
      } else {
        await parametreService.createParametre(formData);
      }
      navigate('/parametres');
    } catch (error) {
      alert("Erreur lors de l'enregistrement");
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
        <h2>{isEditing ? 'Modifier' : 'Ajouter'} un paramètre</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Opérateur</Form.Label>
                <Form.Select
                  name="operateurId"
                  value={formData.operateurId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  {operateurs.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.operateur}
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
                <Form.Label>Résolution</Form.Label>
                <Form.Select
                  name="resolutionId"
                  value={formData.resolutionId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  {resolutions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.resolution}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Diff</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="diff"
                  value={formData.diff}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/parametres')} className="ms-2">
            Annuler
          </Button>
        </Form>
      </Container>
    </motion.div>
  );
};

export default ParametreFormPage;