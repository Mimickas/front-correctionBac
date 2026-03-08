import api from './api';

export const noteService = {
  // Récupérer toutes les notes
  getAllNotes: () => api.get('/notes'),

  // Récupérer une note par ID
  getNoteById: (id) => api.get(`/notes/${id}`),

  // Ajouter une note
  createNote: (noteData) => api.post('/notes', noteData),

  // Modifier une note
  updateNote: (id, noteData) => api.put(`/notes/${id}`, noteData),

  // Supprimer une note
  deleteNote: (id) => api.delete(`/notes/${id}`),

  // Récupérer les étudiants
  getEtudiants: () => api.get('/etudiants'),

  // Récupérer les matières
  getMatieres: () => api.get('/matieres'),

  // Récupérer les correcteurs
  getCorrecteurs: () => api.get('/correcteurs'),

  // Récupérer les notes d'un étudiant
  getNotesByEtudiant: (etudiantId) => api.get(`/etudiants/${etudiantId}/notes`),

  // Récupérer les notes d'une matière
  getNotesByMatiere: (matiereId) => api.get(`/matieres/${matiereId}/notes`),
};