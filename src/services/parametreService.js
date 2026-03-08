import api from './api';

export const parametreService = {
  // Opérateurs
  getOperateurs: () => api.get('/operateur'),

  // Matières (pour paramètres)
  getMatieres: () => api.get('/matieres-pour-parametre'),

  // Résolutions
  getResolutions: () => api.get('/resolution'),

  // Paramètres
  getAllParametres: () => api.get('/parametres'),
  getParametreById: (id) => api.get(`/parametres/${id}`),
  createParametre: (data) => api.post('/parametres', data),
  updateParametre: (id, data) => api.put(`/parametres/${id}`, data),
  deleteParametre: (id) => api.delete(`/parametres/${id}`),
};