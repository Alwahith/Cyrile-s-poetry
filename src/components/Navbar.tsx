import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  hideNav?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, hideNav = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (hideNav) return null;

  const navLinks = [
    { label: 'Poems', path: '/poems' },
    { label: 'The Book', path: '/book' },
    { label: 'The Poet', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/poems' && location.pathname.startsWith('/poems')) return true;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-paper-100/95 backdrop-blur-sm border-b border-rule transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Title */}
          <Link to="/" className="group flex flex-col items-start focus:outline-none">
            <span className="font-display text-xl sm:text-2xl tracking-[0.18em] uppercase text-ink font-semibold group-hover:text-burgundy transition-colors duration-150">
              Love’s Journey
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-ink-muted font-sans font-light">
              From Proposal to Promise
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-sans tracking-[0.2em] uppercase transition-colors duration-150 py-1 relative ${
                  isActive(link.path)
                    ? 'text-burgundy font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-burgundy'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 text-xs font-sans tracking-[0.2em] uppercase text-ink-muted hover:text-burgundy transition-colors duration-150 pl-2 border-l border-rule focus:outline-none"
              aria-label="Search collection"
            >
              <Search className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Search</span>
            </button>
          </nav>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-ink-muted hover:text-ink focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink hover:text-burgundy focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rule bg-paper-100 px-6 py-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-sans tracking-[0.2em] uppercase text-ink hover:text-burgundy py-1"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-sans tracking-[0.2em] uppercase py-1 ${
                  isActive(link.path) ? 'text-burgundy font-medium' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-sans tracking-[0.2em] uppercase text-ink-muted hover:text-ink py-1 flex items-center space-x-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-rule text-xs text-ink-light space-y-1">
            <p className="font-serif italic">“In the depths of struggle, we uncover the true essence of connection...”</p>
            <p className="font-sans uppercase text-[10px] tracking-widest text-ink-muted">— Cyril Edwin</p>
          </div>
        </div>
      )}
    </header>
  );
};
