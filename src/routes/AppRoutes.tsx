import { useAuth } from "@/features/admin/auth/hooks/useAuth";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginForm } from "@/features/admin/auth/components/LoginForm";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MainLayout } from "@/components/layout/MainLayout";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";
import LandingPage from "@/features/public/landingPage/page/LandingPage";
import GalleryPage from "@/features/public/gallery/page/GalleryPage";
import ArtworkDetailPage from "@/features/public/details/pages/ArtworkDetailPage";
import ExplorerPage from "@/features/public/explorer/page/ExplorerPage";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <PageWrapper>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
        <Route path="/explore" element={<ExplorerPage />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginForm />
            ) : (
              <Navigate to="/admin/dashboard" replace />
            )
          }
        />
        {/* Routes protégées */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};
