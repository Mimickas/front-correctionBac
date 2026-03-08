import api from './api';

export const authService = {
  mijeryNoteFinale: (etudiantId, matiereId) =>
    api.post('/auth/mijeryNoteFinale', { etudiantId, matiereId }),
};