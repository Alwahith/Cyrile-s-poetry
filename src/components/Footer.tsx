import React from 'react';
import { Link } from 'react-router-dom';
import { bookData } from '../data/bookData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-28 border-t border-rule bg-paper-100/60 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Title & Epigraph */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
              The Digital Edition
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-light tracking-wide">
              Love’s Journey
            </h2>
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-ink-muted">
              From Proposal to Promise • Poetry by Cyril Edwin
            </p>
            <p className="font-serif italic text-ink-muted text-base max-w-md pt-2 leading-relaxed">
              “To navigate the landscape of love is to embrace both the beauty and the burden; to emerge from trials not unscathed, but transformed.”
            </p>
          </div>

          {/* Middle Column: Editorial Directory */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-ink font-semibold">
              Index
            </h3>
            <ul className="space-y-2.5 text-xs font-sans tracking-[0.15em] uppercase text-ink-muted">
              <li>
                <Link to="/poems" className="hover:text-burgundy transition-colors">The 24 Poems</Link>
              </li>
              <li>
                <Link to="/book#dedication" className="hover:text-burgundy transition-colors">Dedication</Link>
              </li>
              <li>
                <Link to="/book#tributes" className="hover:text-burgundy transition-colors">Tributes</Link>
              </li>
              <li>
                <Link to="/book#preface" className="hover:text-burgundy transition-colors">Preface</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-burgundy transition-colors">About Cyril Edwin</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-burgundy transition-colors">Search Verses</Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Publication & Colophon */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-ink font-semibold">
              Colophon
            </h3>
            <div className="text-xs font-serif text-ink-muted space-y-1.5 leading-relaxed">
              <p className="font-semibold text-ink">{bookData.publisher.name}</p>
              <p>{bookData.publisher.address}</p>
              <p>{bookData.publisher.edition}</p>
              <p className="font-sans text-[11px] tracking-wider text-ink-light pt-1">
                ISBN: {bookData.publisher.isbn}
              </p>
              <p className="font-sans text-[11px] tracking-wider text-ink-light">
                {bookData.publisher.printer}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="mt-16 pt-8 border-t border-rule flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans tracking-[0.18em] uppercase text-ink-light space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Cyril Edwin. All rights reserved.</p>
          <p className="flex items-center space-x-2">
            <span>Newsman Publications</span>
            <span className="text-rule">•</span>
            <span>Madurai, Tamil Nadu</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
