import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { PoemsIndexPage } from './pages/PoemsIndexPage';
import { PoemDetailPage } from './pages/PoemDetailPage';
import { BookPage } from './pages/BookPage';
import { AboutPage } from './pages/AboutPage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Helper component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [readingMode, setReadingMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Reset reading mode when navigating away from a poem page
  useEffect(() => {
    if (!location.pathname.startsWith('/poems/')) {
      setReadingMode(false);
    }
  }, [location.pathname]);

  // Global key listener for search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-paper-100 text-ink flex flex-col font-sans selection:bg-burgundy/15 selection:text-ink">
      <ScrollToTop />

      {/* Navigation (Hidden in distraction-free reading mode) */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} hideNav={readingMode} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/poems" element={<PoemsIndexPage />} />
          <Route
            path="/poems/:slug"
            element={
              <PoemDetailPage
                readingMode={readingMode}
                setReadingMode={setReadingMode}
              />
            }
          />
          <Route path="/book" element={<BookPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer (Hidden in distraction-free reading mode) */}
      {!readingMode && <Footer />}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};
