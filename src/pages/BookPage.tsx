import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { bookData } from '../data/bookData';
import { poemsData } from '../data/poemsData';
import { BookOrnament } from '../components/BookOrnament';

export const BookPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Page Header: Digital Edition Front Matter */}
        <header className="text-center space-y-4 mb-24 pb-12 border-b border-rule">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-burgundy font-semibold">
            Front Matter & Editorial Records
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-ink font-light tracking-wide uppercase">
            The Book
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-ink-muted">
            Love’s Journey: From Proposal to Promise • Newsman Publications
          </p>

          {/* Quick jump menu */}
          <nav className="pt-6 flex flex-wrap justify-center gap-4 text-xs font-sans tracking-[0.18em] uppercase text-ink-muted">
            <a href="#dedication" className="hover:text-burgundy transition-colors">01 Dedication</a>
            <span className="text-rule">•</span>
            <a href="#quotation" className="hover:text-burgundy transition-colors">02 Quotation</a>
            <span className="text-rule">•</span>
            <a href="#tributes" className="hover:text-burgundy transition-colors">03 Tributes</a>
            <span className="text-rule">•</span>
            <a href="#preface" className="hover:text-burgundy transition-colors">04 Preface</a>
            <span className="text-rule">•</span>
            <a href="#contents" className="hover:text-burgundy transition-colors">05 Contents</a>
          </nav>
        </header>

        {/* SECTION 01: DEDICATION */}
        <section id="dedication" className="py-16 sm:py-24 scroll-mt-24 border-b border-rule">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy font-semibold">
                Section 01
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light tracking-wide uppercase">
                Dedication
              </h2>
            </div>

            <div className="space-y-6 font-serif text-xl sm:text-2xl text-ink font-light italic leading-relaxed sm:leading-loose">
              <p>
                {bookData.dedication.text[0]}
              </p>
              <p className="text-lg sm:text-xl text-ink-muted font-normal">
                {bookData.dedication.text[1]}
              </p>
            </div>

            <BookOrnament variant="small" />
          </div>
        </section>

        {/* SECTION 02: ABOUT THE BOOK / QUOTATION */}
        <section id="quotation" className="py-16 sm:py-24 scroll-mt-24 border-b border-rule bg-paper-50/50 -mx-6 sm:-mx-8 px-6 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy font-semibold">
                Section 02
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light tracking-wide uppercase">
                The Core Quotation
              </h2>
            </div>

            <blockquote className="font-serif text-2xl sm:text-3xl text-ink font-light italic leading-relaxed sm:leading-loose">
              “{bookData.quotation.quote}”
            </blockquote>

            <div className="pt-2">
              <span className="text-xs font-sans tracking-[0.22em] uppercase text-ink-muted">
                — Inscription by Cyril Edwin
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 03: TRIBUTES */}
        <section id="tributes" className="py-16 sm:py-24 scroll-mt-24 border-b border-rule">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy font-semibold">
                Section 03
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light tracking-wide uppercase">
                Tributes
              </h2>
            </div>

            <div className="font-serif text-lg sm:text-xl text-ink-muted leading-[2.0] space-y-6 text-left">
              {bookData.tributes.text.map((para, idx) => (
                <p key={idx} className="first-letter:text-4xl first-letter:font-display first-letter:text-burgundy first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  {para}
                </p>
              ))}
            </div>

            <BookOrnament variant="small" />
          </div>
        </section>

        {/* SECTION 04: PREFACE */}
        <section id="preface" className="py-16 sm:py-24 scroll-mt-24 border-b border-rule">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy font-semibold">
                Section 04
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light tracking-wide uppercase">
                Author’s Preface
              </h2>
            </div>

            <div className="font-serif text-lg sm:text-xl text-ink-muted leading-[2.0] space-y-6 text-left">
              {bookData.preface.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-display first-letter:text-burgundy first-letter:mr-2 first-letter:float-left first-letter:leading-none" : ""}>
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-6 text-right">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink font-semibold">
                Cyril Edwin
              </p>
              <p className="font-serif italic text-sm text-ink-light">
                Trichy, Tamil Nadu
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 05: TABLE OF CONTENTS */}
        <section id="contents" className="py-16 sm:py-24 scroll-mt-24 border-b border-rule">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy font-semibold">
                Section 05
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-light tracking-wide uppercase">
                Table of Contents
              </h2>
            </div>

            <div className="divide-y divide-rule/70">
              {poemsData.map((poem) => (
                <Link
                  key={poem.slug}
                  to={`/poems/${poem.slug}`}
                  className="py-4 flex items-center justify-between group hover:bg-paper-200/50 px-3 -mx-3 transition-colors"
                >
                  <div className="flex items-baseline space-x-6">
                    <span className="font-sans text-xs tracking-widest text-burgundy font-medium w-8">
                      {String(poem.number).padStart(2, '0')}.
                    </span>
                    <span className="font-display text-lg sm:text-xl text-ink group-hover:text-burgundy transition-colors">
                      {poem.title}
                    </span>
                  </div>
                  <span className="text-xs font-sans tracking-widest uppercase text-ink-light flex items-center space-x-2">
                    <span>{poem.lineCount} lines</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 06: COLOPHON DETAILS */}
        <section className="py-16 sm:py-24 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy font-semibold">
              Publication Colophon
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-light uppercase">
              Bibliographic Records
            </h2>
          </div>

          {/* Publisher logo extracted from PDF page 1 */}
          <div className="flex justify-center py-4">
            <img
              src="/images/publisher/newsman-logo.jpg"
              alt="Newsman Publications Logo"
              className="h-16 w-auto object-contain filter contrast-125"
            />
          </div>

          <div className="max-w-md mx-auto font-serif text-sm text-ink-muted space-y-1.5 leading-relaxed">
            <p className="font-semibold text-ink">{bookData.publisher.name}</p>
            <p>{bookData.publisher.address}</p>
            <p>{bookData.publisher.contact}</p>
            <p className="font-sans text-xs tracking-wider text-ink-light pt-2">
              {bookData.publisher.edition} • {bookData.publisher.pages} Pages
            </p>
            <p className="font-sans text-xs tracking-wider text-ink-light">
              ISBN: {bookData.publisher.isbn} • {bookData.publisher.price}
            </p>
            <p className="font-sans text-xs tracking-wider text-ink-light">
              {bookData.publisher.printer}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
