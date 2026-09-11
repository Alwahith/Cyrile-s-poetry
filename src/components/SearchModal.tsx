import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { poemsData } from '../data/poemsData';
import { bookData } from '../data/bookData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: 'poem' | 'book';
  title: string;
  subtitle: string;
  matchSnippet?: string;
  url: string;
  poemNumber?: number;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Global shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }

    const matches: SearchResult[] = [];

    // Search in poems
    poemsData.forEach((poem) => {
      const titleMatch = poem.title.toLowerCase().includes(q);
      let lineMatch: string | undefined = undefined;

      for (const stanza of poem.stanzas) {
        for (const line of stanza) {
          if (line.toLowerCase().includes(q)) {
            lineMatch = line;
            break;
          }
        }
        if (lineMatch) break;
      }

      if (titleMatch || lineMatch) {
        matches.push({
          type: 'poem',
          title: poem.title,
          subtitle: `Poem ${String(poem.number).padStart(2, '0')} of 24`,
          matchSnippet: lineMatch,
          url: `/poems/${poem.slug}`,
          poemNumber: poem.number,
        });
      }
    });

    // Search in book sections
    if (bookData.quotation.quote.toLowerCase().includes(q)) {
      matches.push({
        type: 'book',
        title: 'Book Quotation',
        subtitle: 'Front Matter',
        matchSnippet: bookData.quotation.quote,
        url: '/book#quotation',
      });
    }

    for (const dLine of bookData.dedication.text) {
      if (dLine.toLowerCase().includes(q)) {
        matches.push({
          type: 'book',
          title: 'Dedication',
          subtitle: 'Front Matter',
          matchSnippet: dLine,
          url: '/book#dedication',
        });
        break;
      }
    }

    for (const pPara of bookData.preface.paragraphs) {
      if (pPara.toLowerCase().includes(q)) {
        matches.push({
          type: 'book',
          title: 'Preface',
          subtitle: 'Author’s Introduction',
          matchSnippet: pPara.slice(0, 180) + '...',
          url: '/book#preface',
        });
        break;
      }
    }

    for (const bio of bookData.aboutPoet.biography) {
      if (bio.toLowerCase().includes(q)) {
        matches.push({
          type: 'book',
          title: 'About Cyril Edwin',
          subtitle: 'Author Biography',
          matchSnippet: bio.slice(0, 180) + '...',
          url: '/about',
        });
        break;
      }
    }

    setResults(matches);
  }, [query]);

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  const highlightMatch = (text: string, q: string) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark key={i} className="bg-burgundy/15 text-burgundy font-medium px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div 
        className="w-full max-w-2xl bg-paper-100 rounded-sm shadow-2xl border border-rule overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-rule bg-paper-50">
          <Search className="w-5 h-5 text-burgundy mr-3 stroke-[1.75]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search verses, titles, preface, or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-ink placeholder:text-ink-light font-sans text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-ink-light hover:text-ink mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-sans uppercase tracking-widest text-ink-muted hover:text-burgundy px-2 py-1 border border-rule rounded-sm"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-rule/60">
          {query.trim().length < 2 && (
            <div className="py-12 text-center text-ink-light">
              <p className="font-serif italic text-base sm:text-lg">
                Type a word or phrase from the collection to search...
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-sans uppercase tracking-wider text-ink-muted">
                {['Stars', 'Frozen Lake', 'Campus', 'Promises', 'Dawn', 'Struggles'].map((suggest) => (
                  <button
                    key={suggest}
                    onClick={() => setQuery(suggest)}
                    className="px-2.5 py-1 bg-paper-200 hover:bg-burgundy/10 hover:text-burgundy rounded-sm transition-colors"
                  >
                    “{suggest}”
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center text-ink-muted">
              <p className="font-serif italic text-base sm:text-lg">
                No verses found matching “{query}”
              </p>
              <p className="text-xs font-sans tracking-widest uppercase text-ink-light mt-2">
                Try searching for broader poetic themes or author notes.
              </p>
            </div>
          )}

          {results.map((res, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(res.url)}
              className="py-4 px-3 hover:bg-paper-200/70 rounded-sm cursor-pointer transition-colors group flex items-start justify-between"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-burgundy font-semibold">
                    {res.subtitle}
                  </span>
                </div>
                <h4 className="font-display text-lg sm:text-xl text-ink group-hover:text-burgundy transition-colors font-medium">
                  {highlightMatch(res.title, query)}
                </h4>
                {res.matchSnippet && (
                  <p className="font-serif text-sm text-ink-muted italic leading-relaxed pt-1">
                    “{highlightMatch(res.matchSnippet, query)}”
                  </p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-ink-light group-hover:text-burgundy group-hover:translate-x-1 transition-all mt-2 shrink-0" />
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-paper-200/50 border-t border-rule text-right">
          <span className="text-[10px] font-sans tracking-widest uppercase text-ink-light">
            Love’s Journey • Newsman Publications
          </span>
        </div>
      </div>
    </div>
  );
};
