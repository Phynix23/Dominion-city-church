import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import GlobalSearch from './components/common/GlobalSearch';
import './styles/index.css';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Ministries = lazy(() => import('./pages/Ministries'));
const Events = lazy(() => import('./pages/Events'));
const Sermons = lazy(() => import('./pages/Sermons'));
const Give = lazy(() => import('./pages/Give'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const Books = lazy(() => import('./pages/Books'));

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <Navbar />
        <GlobalSearch />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/give" element={<Give />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/books" element={<Books />} />
          </Routes>
        </Suspense>
        <Footer />
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;