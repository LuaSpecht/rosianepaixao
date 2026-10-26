import { Route, Routes } from 'react-router';
import Layout from './components/Layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AtendimentoPage from './pages/AtendimentoPage.jsx';
import NoivasPage from './pages/NoivasPage.jsx';
import DepoimentosPage from './pages/DepoimentosPage.jsx';
import ContatoPage from './pages/ContatoPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

/**
 * Rotas do site. Cada página vive em src/pages e só monta os componentes
 * de src/components. O Layout (cabeçalho, rodapé, WhatsApp) é comum a todas.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="atendimento" element={<AtendimentoPage />} />
        <Route path="noivas" element={<NoivasPage />} />
        {/* antigo endereço: leva para os depoimentos dentro da página Noivas */}
        <Route path="depoimentos" element={<DepoimentosPage />} />
        <Route path="contato" element={<ContatoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
