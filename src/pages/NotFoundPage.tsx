import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BookOrnament } from '../components/BookOrnament';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center">
      <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-burgundy font-semibold">
        404 • Page Not Found
      </span>
      <h1 className="font-display text-4xl sm:text-6xl text-ink font-light mt-3 mb-4">
        Unwritten Page
      </h1>
      <p className="font-serif italic text-base sm:text-lg text-ink-muted max-w-md">
        The leaf you are seeking does not exist in this volume of Love’s Journey.
      </p>
      <BookOrnament variant="small" />
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-semibold hover:text-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Title Page</span>
      </Link>
    </div>
  );
};
