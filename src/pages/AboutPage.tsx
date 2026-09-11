import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MapPin, Calendar, GraduationCap, Heart } from 'lucide-react';
import { bookData } from '../data/bookData';
import { BookOrnament } from '../components/BookOrnament';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <header className="text-center space-y-4 mb-20 pb-10 border-b border-rule">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-burgundy font-semibold">
            The Author
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-ink font-light tracking-wide uppercase">
            About the Poet
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-ink-muted">
            Cyril Edwin R — Verse, Memory & Imagination
          </p>
        </header>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Author Portrait */}
          <div className="md:col-span-5 space-y-6">
            <div className="border border-rule p-2.5 bg-paper-50 shadow-sm relative group">
              <img
                src="/images/author/cyril-edwin.jpg"
                alt="Portrait of poet Cyril Edwin R"
                className="w-full h-auto object-cover grayscale contrast-115 transition-all duration-300 group-hover:contrast-125"
              />
              <div className="pt-3 pb-1 text-center">
                <p className="font-display text-lg text-ink font-medium">Cyril Edwin R</p>
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-ink-light">
                  Author • Poet
                </p>
              </div>
            </div>

            {/* Biographical Metadata Card */}
            <div className="border border-rule p-6 space-y-3 bg-paper-50/70 text-xs font-sans tracking-wider text-ink-muted">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-burgundy shrink-0" />
                <span>Born: {bookData.aboutPoet.birth}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-burgundy shrink-0" />
                <span>{bookData.aboutPoet.birthplace}</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-4 h-4 text-burgundy shrink-0" />
                <span>Urumu Dhanalakshmi College, Kattur, Trichy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4 text-burgundy shrink-0" />
                <span>Muse & Spouse: {bookData.aboutPoet.spouse}</span>
              </div>
            </div>
          </div>

          {/* Biography Text (Verbatim from Canonical PDF Page 4) */}
          <div className="md:col-span-7 space-y-6 text-base sm:text-lg font-serif text-ink-muted leading-[2.0]">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy font-semibold block">
              Biography
            </span>

            {bookData.aboutPoet.biography.map((para, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "first-letter:text-5xl first-letter:font-display first-letter:text-burgundy first-letter:mr-2.5 first-letter:float-left first-letter:leading-none" : ""}
              >
                {para}
              </p>
            ))}

            <BookOrnament variant="small" />

            {/* Author's Reflection */}
            <div className="border-l-2 border-burgundy/60 pl-6 my-8 italic text-ink font-serif text-lg leading-relaxed bg-burgundy/[0.02] py-2">
              “With a pen as his compass, Cyril navigates the landscapes of emotion, memory, and imagination, crafting verses that resonate deeply with readers.”
            </div>

            {/* Navigation CTA */}
            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                to="/poems"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-ink text-paper-100 text-xs font-sans tracking-[0.2em] uppercase hover:bg-burgundy transition-colors"
              >
                <span>Read Cyril’s Poems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/book#preface"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-rule text-ink text-xs font-sans tracking-[0.2em] uppercase hover:border-ink hover:text-burgundy transition-colors"
              >
                <span>Read His Preface</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
