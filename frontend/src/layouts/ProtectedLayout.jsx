import { ProtectedRoute } from '../components/shared/ProtectedRoute';

export default function ProtectedLayout({ children, requireAdmin = false }) {
  return (
    <ProtectedRoute requireAdmin={requireAdmin}>
      {children}
    </ProtectedRoute>
  );
}
