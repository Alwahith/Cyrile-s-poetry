import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { poemsData, Poem } from '../data/poemsData';
import { BookOrnament } from '../components/BookOrnament';

export const PoemsIndexPage: React.FC = () => {
  const [hoveredPoem, setHoveredPoem] = useState<Poem | null>(null);

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-burgundy font-semibold">
            The Complete Anthology
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-ink font-light tracking-wide uppercase">
            The Poems
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-ink-muted max-w-lg mx-auto">
            Twenty-four verses of vulnerability, quiet devotion, and enduring commitment.
          </p>
          <BookOrnament variant="small" />
        </div>

        {/* Floating preview for desktop hover */}
        <div className="relative">
          {/* Main List */}
          <div className="divide-y divide-rule border-t border-b border-rule">
            {poemsData.map((poem) => (
              <div
                key={poem.slug}
                onMouseEnter={() => setHoveredPoem(poem)}
                onMouseLeave={() => setHoveredPoem(null)}
                className="relative group transition-colors duration-150"
              >
                <Link
                  to={`/poems/${poem.slug}`}
                  className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between px-3 sm:px-6 group-hover:bg-paper-200/50 transition-colors"
                >
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline space-x-6 sm:space-x-10">
                    <span className="font-sans text-xs sm:text-sm tracking-[0.2em] text-burgundy font-medium w-8 shrink-0">
                      {String(poem.number).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal group-hover:text-burgundy group-hover:underline underline-offset-8 decoration-1 decoration-burgundy/40 transition-all">
                        {poem.title}
                      </h2>
                      <p className="font-serif italic text-sm sm:text-base text-ink-light">
                        “{poem.stanzas[0][0]}”
                      </p>
                    </div>
                  </div>

                  {/* Right: Meta & Arrow */}
                  <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end space-x-8 text-xs font-sans tracking-[0.18em] uppercase text-ink-muted">
                    <span className="hidden lg:inline text-[11px] text-ink-light max-w-xs text-right truncate">
                      {poem.theme}
                    </span>
                    <span className="text-[11px] text-ink-light whitespace-nowrap">
                      {poem.lineCount} Lines
                    </span>
                    <span className="text-ink-light group-hover:text-burgundy group-hover:translate-x-1.5 transition-all">
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                    </span>
                  </div>
                </Link>

                {/* Subtle hover thumbnail for desktop */}
                {hoveredPoem?.slug === poem.slug && (
                  <div className="hidden md:block absolute right-32 top-1/2 -translate-y-1/2 pointer-events-none z-20 transition-opacity duration-200">
                    <div className="w-36 h-24 overflow-hidden rounded-sm border border-rule bg-paper-100 shadow-lg">
                      <img
                        src={poem.image}
                        alt=""
                        className="w-full h-full object-cover filter contrast-[1.05] sepia-[0.1]"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Colophon Note */}
        <div className="mt-16 text-center text-xs font-sans tracking-[0.2em] uppercase text-ink-light">
          <p>Read in sequence or explore freely • First Edition October 2024</p>
        </div>
      </div>
    </div>
  );
};
