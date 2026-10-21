import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CanvasProvider } from './context/CanvasContext';
import { LandingPage } from './pages/LandingPage';
import { EditorPage } from './pages/EditorPage';

export default function App() {
  return (
    <CanvasProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CanvasProvider>
  );
}
