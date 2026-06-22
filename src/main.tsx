import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { getLegalPageSlug, LegalPage } from './pages/LegalPages.tsx';
import './index.css';

const legalPageSlug = getLegalPageSlug();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {legalPageSlug ? <LegalPage slug={legalPageSlug} /> : <App />}
  </StrictMode>,
);
