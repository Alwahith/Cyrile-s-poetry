import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Check, 
  Maximize2, 
  Minimize2, 
  Type, 
  Printer,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { poemsData, Poem } from '../data/poemsData';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { BookOrnament } from '../components/BookOrnament';

interface PoemDetailPageProps {
  readingMode: boolean;
  setReadingMode: (val: boolean) => void;
}

export const PoemDetailPage: React.FC<PoemDetailPageProps> = ({
  readingMode,
  setReadingMode,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find current poem
  const currentIndex = poemsData.findIndex((p) => p.slug === slug);
  const poem: Poem | undefined = poemsData[currentIndex];

  // Font size state: 'sm' | 'md' | 'lg'
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [copied, setCopied] = useState(false);
  const [showImage, setShowImage] = useState(true);

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigate(`/poems/${poemsData[currentIndex - 1].slug}`);
      } else if (e.key === 'ArrowRight' && currentIndex < poemsData.length - 1) {
        navigate(`/poems/${poemsData[currentIndex + 1].slug}`);
      } else if (e.key.toLowerCase() === 'r') {
        setReadingMode(!readingMode);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, navigate, readingMode, setReadingMode]);

  // Set document title
  useEffect(() => {
    if (poem) {
      document.title = `${poem.title} — Cyril Edwin | Love's Journey`;
    }
  }, [poem]);

  if (!poem) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-display text-4xl text-ink font-light">Poem Not Found</h1>
        <p className="font-serif italic text-ink-muted mt-2">The requested verse could not be located in this edition.</p>
        <Link to="/poems" className="mt-6 text-xs font-sans tracking-[0.2em] uppercase text-burgundy font-medium hover:underline">
          Return to Poems Index
        </Link>
      </div>
    );
  }

  const prevPoem = currentIndex > 0 ? poemsData[currentIndex - 1] : null;
  const nextPoem = currentIndex < poemsData.length - 1 ? poemsData[currentIndex + 1] : null;

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Font size classes
  const fontClasses = {
    sm: 'text-base sm:text-lg leading-[1.85]',
    md: 'text-lg sm:text-xl md:text-[21px] leading-[2.0]',
    lg: 'text-xl sm:text-2xl md:text-[25px] leading-[2.15]',
  }[fontSize];

  return (
    <div className={`min-h-screen transition-all duration-300 ${readingMode ? 'py-8' : 'py-12 sm:py-20'}`}>
      <ReadingProgressBar />

      <article className="max-w-2xl mx-auto px-6 sm:px-8">
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between mb-12 pb-4 border-b border-rule/70 text-xs font-sans tracking-[0.16em] uppercase text-ink-muted no-print">
          {/* Breadcrumb / Counter */}
          <div className="flex items-center space-x-3">
            <Link to="/poems" className="hover:text-burgundy transition-colors flex items-center space-x-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Poems</span>
            </Link>
            <span className="text-rule">•</span>
            <span className="text-burgundy font-medium">
              {String(poem.number).padStart(2, '0')} / 24
            </span>
          </div>

          {/* Reading tools */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Font size toggle */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setFontSize(fontSize === 'sm' ? 'md' : fontSize === 'md' ? 'lg' : 'sm')}
                className="p-1 hover:text-burgundy transition-colors flex items-center space-x-0.5"
                title="Adjust Text Size"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="text-[10px] font-sans uppercase font-medium">{fontSize}</span>
              </button>
            </div>

            {/* Reading Mode Toggle */}
            <button
              onClick={() => setReadingMode(!readingMode)}
              className={`p-1 flex items-center space-x-1.5 transition-colors ${
                readingMode ? 'text-burgundy font-semibold' : 'hover:text-burgundy'
              }`}
              title={readingMode ? 'Exit Reading Mode (Press R)' : 'Reading Mode (Press R)'}
            >
              {readingMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">
                {readingMode ? 'Exit Focus' : 'Reading Mode'}
              </span>
            </button>

            {/* Share / Copy link */}
            <button
              onClick={copyShareLink}
              className="p-1 hover:text-burgundy transition-colors flex items-center space-x-1"
              title="Copy link to poem"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-burgundy" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">{copied ? 'Copied' : 'Share'}</span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="hidden md:flex p-1 hover:text-burgundy transition-colors items-center space-x-1"
              title="Print page"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* POEM HEADER */}
        <header className="text-center space-y-4 mb-16 sm:mb-20">
          <div className="text-[11px] font-sans tracking-[0.28em] uppercase text-ink-muted">
            Love’s Journey • Poem {String(poem.number).padStart(2, '0')}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink font-light tracking-wide leading-tight">
            {poem.title}
          </h1>

          <div className="pt-2">
            <span className="text-xs font-sans tracking-[0.24em] uppercase text-burgundy font-medium">
              By {poem.author}
            </span>
          </div>

          <BookOrnament variant="small" />
        </header>

        {/* ATMOSPHERIC EDITORIAL IMAGE (Omitted when in strict reading mode or toggleable) */}
        {!readingMode && poem.image && (
          <div className="mb-16 sm:mb-20 no-print">
            <figure className="relative overflow-hidden rounded-sm border border-rule/70 bg-paper-50 shadow-sm">
              <img
                src={poem.image}
                alt={poem.imageAlt}
                className="w-full h-64 sm:h-80 md:h-96 object-cover filter contrast-[1.04] sepia-[0.08]"
                loading="lazy"
              />
              <figcaption className="p-3 text-center text-[10px] font-sans tracking-[0.2em] uppercase text-ink-light border-t border-rule/50">
                {poem.imageAlt}
              </figcaption>
            </figure>
          </div>
        )}

        {/* POEM BODY: THE SACRED VERSE */}
        {/* Preserves exact stanza breaks, lines, punctuation and capitalization */}
        <main className="poem-content font-serif text-ink tracking-normal">
          <div className={`${fontClasses} space-y-8 sm:space-y-10`}>
            {poem.stanzas.map((stanza, sIdx) => (
              <div key={sIdx} className="stanza leading-relaxed">
                {stanza.map((line, lIdx) => (
                  <div key={lIdx} className="poem-line">
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>

        <BookOrnament className="my-16 sm:my-20" />

        {/* PREVIOUS / NEXT NAVIGATION */}
        <nav className="mt-12 pt-8 border-t border-rule no-print" aria-label="Poem pagination">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Previous */}
            <div className="w-full sm:w-1/2 text-left">
              {prevPoem ? (
                <Link
                  to={`/poems/${prevPoem.slug}`}
                  className="group flex flex-col items-start p-3 -m-3 hover:bg-paper-200/50 rounded-sm transition-colors"
                >
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-ink-muted group-hover:text-burgundy flex items-center space-x-1">
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                    <span>Previous Poem</span>
                  </span>
                  <span className="font-display text-lg sm:text-xl text-ink group-hover:text-burgundy transition-colors font-medium mt-1">
                    {prevPoem.title}
                  </span>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-ink-light">
                    {String(prevPoem.number).padStart(2, '0')} / 24
                  </span>
                </Link>
              ) : (
                <div className="text-ink-light/50 text-xs font-sans tracking-widest uppercase">
                  Beginning of Collection
                </div>
              )}
            </div>

            {/* Next */}
            <div className="w-full sm:w-1/2 text-right flex justify-end">
              {nextPoem ? (
                <Link
                  to={`/poems/${nextPoem.slug}`}
                  className="group flex flex-col items-end p-3 -m-3 hover:bg-paper-200/50 rounded-sm transition-colors"
                >
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-ink-muted group-hover:text-burgundy flex items-center space-x-1">
                    <span>Next Poem</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="font-display text-lg sm:text-xl text-ink group-hover:text-burgundy transition-colors font-medium mt-1">
                    {nextPoem.title}
                  </span>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-ink-light">
                    {String(nextPoem.number).padStart(2, '0')} / 24
                  </span>
                </Link>
              ) : (
                <Link
                  to="/poems"
                  className="group flex flex-col items-end p-3 -m-3 hover:bg-paper-200/50 rounded-sm transition-colors"
                >
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-burgundy flex items-center space-x-1">
                    <span>Anthology Index</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="font-display text-lg sm:text-xl text-ink font-medium mt-1">
                    Browse All Poems
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </article>
    </div>
  );
};
