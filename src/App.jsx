import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import EventsPage from './pages/EventsPage';
import DonatePage from './pages/DonatePage';
import DonationDetailPage from './pages/DonationDetailPage';
import AdoptionPage from './pages/AdoptionPage';
import AboutPage from './pages/AboutPage';
import PetDetailPage from './pages/PetDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import GestureDemo from './pages/GestureDemo';
import ScrollToTop from './components/utils/ScrollToTop';
import Effects from './components/utils/Effects';
import Notifications from './components/common/Notifications';
import './App.css';
import './index.css';

// Wrapper component để quản lý hiệu ứng chuyển trang
const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames="page-transition"
        nodeRef={nodeRef}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/donation/:id" element={<DonationDetailPage />} />
          <Route path="/adopt" element={<AdoptionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pet/:id" element={<PetDetailPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/gesture-demo" element={<GestureDemo />} />
          {/* Add more routes as needed */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Effects />
        <Notifications />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
