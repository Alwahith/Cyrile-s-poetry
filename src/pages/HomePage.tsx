import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Feather } from 'lucide-react';
import { poemsData } from '../data/poemsData';
import { bookData } from '../data/bookData';
import { BookOrnament } from '../components/BookOrnament';

export const HomePage: React.FC = () => {
  // Featured poem: Poem 1 "A Promise Under Stars" or Poem 5 "Hearts on a Frozen Lake"
  const featuredPoem = poemsData[0]; // A Promise Under Stars
  const previewPoems = poemsData.slice(0, 8); // First 8 poems for editorial preview

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 border-b border-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto">
            {/* Editorial publication kicker */}
            <div className="inline-flex items-center space-x-3 text-xs font-sans tracking-[0.25em] uppercase text-burgundy font-medium">
              <span className="w-6 h-px bg-burgundy/60"></span>
              <span>Newsman Publications • First Edition</span>
              <span className="w-6 h-px bg-burgundy/60"></span>
            </div>

            {/* Main Typographic Title */}
            <div className="space-y-3">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-[0.14em] uppercase text-ink font-light leading-[1.05]">
                Love’s<br />Journey
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-ink-muted font-normal tracking-wide pt-2">
                From Proposal to Promise
              </p>
            </div>

            {/* Author */}
            <div className="pt-2">
              <p className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-ink font-semibold">
                Poetry by Cyril Edwin
              </p>
            </div>

            {/* Quiet Atmospheric Hero Still */}
            <div className="pt-8 pb-4">
              <div className="relative overflow-hidden rounded-sm border border-rule shadow-sm max-w-2xl mx-auto group">
                <img
                  src="/images/hero-journal.jpg"
                  alt="An open poetry journal resting on an aged wooden desk in morning sunlight"
                  className="w-full h-72 sm:h-96 object-cover filter contrast-[1.05] sepia-[0.08] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-left">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-paper-50/90 font-light drop-shadow-sm">
                    Photograph of study • Newsman Literary Archive
                  </span>
                </div>
              </div>
            </div>

            {/* Call to explore */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/poems"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-ink text-paper-100 text-xs font-sans tracking-[0.2em] uppercase hover:bg-burgundy transition-all duration-200 shadow-sm"
              >
                <span>Read The Poems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center space-x-2 px-8 py-3.5 border border-rule text-ink text-xs font-sans tracking-[0.2em] uppercase hover:border-ink hover:text-burgundy transition-colors duration-150"
              >
                <span>About The Book</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BOOK QUOTATION / EPIGRAPH */}
      <section className="py-20 sm:py-28 border-b border-rule bg-paper-50/70">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold">
            The Epigraph
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink font-light italic leading-relaxed sm:leading-loose">
            “{bookData.quotation.quote}”
          </blockquote>
          <div className="pt-4">
            <cite className="font-sans text-xs tracking-[0.22em] uppercase text-ink-muted not-italic">
              — Cyril Edwin, <span className="italic font-serif normal-case tracking-normal">Love’s Journey</span>
            </cite>
          </div>
        </div>
      </section>

      {/* 3. THE COLLECTION (From Preface) */}
      <section className="py-24 sm:py-32 border-b border-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 space-y-3">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
                The Collection
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light leading-tight">
                Authentic Experiences of Love
              </h2>
              <p className="font-sans text-xs tracking-[0.18em] uppercase text-ink-light pt-2">
                24 Poems • First Edition 2024
              </p>
            </div>

            <div className="md:col-span-8 space-y-6 text-base sm:text-lg font-serif text-ink-muted leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-display first-letter:text-burgundy first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {bookData.preface.paragraphs[0]}
              </p>
              <p>
                {bookData.preface.paragraphs[1]}
              </p>
              <div className="pt-4">
                <Link
                  to="/book#preface"
                  className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-medium hover:text-ink transition-colors"
                >
                  <span>Read Author’s Full Preface</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED POEM SPOTLIGHT */}
      <section className="py-24 sm:py-32 border-b border-rule bg-paper-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold">
              Opening Verse • Poem 01
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-ink font-light tracking-wide uppercase">
              {featuredPoem.title}
            </h2>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-muted">
              By {featuredPoem.author}
            </p>
          </div>

          <div className="bg-paper-100 border border-rule p-8 sm:p-14 shadow-sm relative max-w-2xl mx-auto">
            <div className="font-serif text-lg sm:text-xl text-ink leading-[2.1] space-y-6 text-left">
              <div>
                {featuredPoem.stanzas[0].map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              <div className="pt-2 text-ink-light font-serif italic text-base">
                [ ... ]
              </div>
              <div>
                {featuredPoem.stanzas[3].map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-rule flex items-center justify-between">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-ink-light">
                Stanzas: {featuredPoem.stanzaCount} • Lines: {featuredPoem.lineCount}
              </span>
              <Link
                to={`/poems/${featuredPoem.slug}`}
                className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-semibold hover:text-ink transition-colors"
              >
                <span>Read Full Poem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE POEMS (Editorial Archive Preview) */}
      <section className="py-24 sm:py-32 border-b border-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-rule">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
                Table of Contents
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light mt-1">
                The Poems
              </h2>
            </div>
            <Link
              to="/poems"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-ink hover:text-burgundy transition-colors"
            >
              <span>View All 24 Poems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-rule">
            {previewPoems.map((poem) => (
              <Link
                key={poem.slug}
                to={`/poems/${poem.slug}`}
                className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-paper-200/50 px-3 -mx-3 transition-colors duration-150"
              >
                <div className="flex items-baseline space-x-6 sm:space-x-8">
                  <span className="font-sans text-xs tracking-widest text-burgundy font-medium w-8">
                    {String(poem.number).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-ink group-hover:text-burgundy transition-colors font-normal">
                      {poem.title}
                    </h3>
                    <p className="font-serif italic text-sm text-ink-light pt-1">
                      “{poem.stanzas[0][0]}”
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0 flex items-center space-x-6 text-xs font-sans tracking-widest uppercase text-ink-light">
                  <span className="hidden md:inline text-[11px] text-ink-muted max-w-xs truncate">
                    {poem.theme}
                  </span>
                  <span className="group-hover:text-burgundy group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center pt-8 border-t border-rule">
            <Link
              to="/poems"
              className="inline-flex items-center space-x-3 px-8 py-3.5 border border-rule text-ink text-xs font-sans tracking-[0.2em] uppercase hover:bg-ink hover:text-paper-100 transition-all duration-200"
            >
              <span>Browse All 24 Poems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. THE BOOK (Front Matter Sections Preview) */}
      <section className="py-24 sm:py-32 border-b border-rule bg-paper-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
              The Printed Edition
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink font-light">
              Front Matter & Dedication
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dedication Card */}
            <div className="bg-paper-100 border border-rule p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
                  01 • Dedication
                </span>
                <h3 className="font-display text-xl text-ink font-medium">
                  To My Wife & Resilient Hearts
                </h3>
                <p className="font-serif italic text-sm text-ink-muted leading-relaxed">
                  “I dedicate this book, Love’s Journey, to my wife, whose support and love inspire me every day...”
                </p>
              </div>
              <Link
                to="/book#dedication"
                className="text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-medium hover:text-ink pt-4 inline-flex items-center space-x-1"
              >
                <span>Read Dedication</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Tributes Card */}
            <div className="bg-paper-100 border border-rule p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
                  02 • Tributes
                </span>
                <h3 className="font-display text-xl text-ink font-medium">
                  Teachers, Family & Poets
                </h3>
                <p className="font-serif italic text-sm text-ink-muted leading-relaxed">
                  “I extend my heartfelt gratitude to my wife for your unwavering love and support... To the poets and authors who have paved the way...”
                </p>
              </div>
              <Link
                to="/book#tributes"
                className="text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-medium hover:text-ink pt-4 inline-flex items-center space-x-1"
              >
                <span>Read Tributes</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Preface Card */}
            <div className="bg-paper-100 border border-rule p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
                  03 • Preface
                </span>
                <h3 className="font-display text-xl text-ink font-medium">
                  Author’s Introduction
                </h3>
                <p className="font-serif italic text-sm text-ink-muted leading-relaxed">
                  “In a world that often glorifies the idealized moments of love, we frequently overlook the rich tapestry woven from the threads of vulnerability...”
                </p>
              </div>
              <Link
                to="/book#preface"
                className="text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-medium hover:text-ink pt-4 inline-flex items-center space-x-1"
              >
                <span>Read Preface</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE POET */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="border border-rule p-2 bg-paper-50 shadow-sm">
                <img
                  src="/images/author/cyril-edwin.jpg"
                  alt="Portrait of poet Cyril Edwin"
                  className="w-full h-auto object-cover grayscale contrast-110"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-burgundy font-semibold">
                About The Poet
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light">
                Cyril Edwin R
              </h2>
              <div className="font-serif text-base sm:text-lg text-ink-muted space-y-4 leading-relaxed">
                <p>
                  {bookData.aboutPoet.biography[0]}
                </p>
                <p>
                  {bookData.aboutPoet.biography[1]}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-semibold hover:text-ink transition-colors"
                >
                  <span>Complete Biography</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
