import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Lazy load pages for optimal loading performance
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ChatWorkspace = React.lazy(() => import('./pages/ChatWorkspace'));
const SolutionPage = React.lazy(() => import('./pages/SolutionPage'));
const VideoPage = React.lazy(() => import('./pages/VideoPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));

// Glowing Loader Skeleton
const PageLoader = () => (
  <div className="min-height-screen bg-background flex flex-col items-center justify-center space-y-4">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-secondary animate-spin"></div>
    </div>
    <span className="text-muted text-sm font-mono tracking-wider">LOADING MATAI LAB MODULE<span className="dots-anim">...</span></span>
  </div>
);

// Protected routes to ensure gamification progress is stored per user
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Navigate to="/workspace" replace />} />
          <Route path="/workspace" element={
            <ProtectedRoute>
              <ChatWorkspace />
            </ProtectedRoute>
          } />
          <Route path="/solution" element={<Navigate to="/workspace" replace />} />
          <Route path="/video" element={<Navigate to="/workspace" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
