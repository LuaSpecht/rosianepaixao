import { Navigate } from 'react-router';

/**
 * Depoimentos agora fazem parte da página Noivas.
 * Este componente mantém o endereço antigo (/depoimentos) funcionando:
 * redireciona para /noivas e rola até a seção de depoimentos.
 */
export default function DepoimentosPage() {
  return <Navigate to="/noivas#depoimentos" replace />;
}
