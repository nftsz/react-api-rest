import { Suspense, lazy, type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

// Lazy Loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const GalleryFormPage = lazy(() => import("../pages/GalleryFormPage"));
const GalleryDetailPage = lazy(() => import("../pages/GalleryDetailPage"));

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Verificando sessão...</div>;
  }

  if (isAuthenticated === false) {
    window.location.href = "/login";
    return null;
  }

  return children;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/gallery"
          element={
            <PrivateRoute>
              <GalleryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/gallery/new"
          element={
            <PrivateRoute>
              <GalleryFormPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/gallery/:id"
          element={
            <PrivateRoute>
              <GalleryDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/gallery/:id/edit"
          element={
            <PrivateRoute>
              <GalleryFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
