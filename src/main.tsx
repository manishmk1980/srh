import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { getLegalPageSlug, LegalPage } from './pages/LegalPages.tsx';
import { getProductPageSlug, ProductDetailPage } from './pages/ProductDetailPage.tsx';
import LegalSupportNotice from './components/LegalSupportNotice.tsx';
import './index.css';

const legalPageSlug = getLegalPageSlug();
const productPageSlug = getProductPageSlug();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {legalPageSlug ? (
      <>
        <LegalPage slug={legalPageSlug} />
        <LegalSupportNotice />
      </>
    ) : productPageSlug ? (
      <ProductDetailPage slug={productPageSlug} />
    ) : (
      <>
        <App />
        <LegalSupportNotice />
      </>
    )}
  </StrictMode>,
);
