import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotesPage from './pages/NotesPage';
import NoteFormPage from './pages/NoteFormPage';
import ParametresPage from './pages/ParametresPage';
import ParametreFormPage from './pages/ParametreFormPage';
import NoteFinalePage from './pages/NoteFinalePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/nouveau" element={<NoteFormPage />} />
          <Route path="/notes/modifier/:id" element={<NoteFormPage />} />
          <Route path="/parametres" element={<ParametresPage />} />
          <Route path="/parametres/nouveau" element={<ParametreFormPage />} />
          <Route path="/parametres/modifier/:id" element={<ParametreFormPage />} />
          <Route path="/note-finale" element={<NoteFinalePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
