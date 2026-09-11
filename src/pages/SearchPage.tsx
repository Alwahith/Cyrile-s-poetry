import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Feather } from 'lucide-react';
import { poemsData } from '../data/poemsData';
import { bookData } from '../data/bookData';
import { BookOrnament } from '../components/BookOrnament';

interface ResultItem {
  type: 'poem' | 'book';
  title: string;
  category: string;
  url: string;
  snippet?: string;
  poemNumber?: number;
}

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      setSearchParams({ q: query }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }

    if (!q || q.length < 2) {
      setResults([]);
      return;
    }

    const hits: ResultItem[] = [];

    // Search in poems
    poemsData.forEach((poem) => {
      const inTitle = poem.title.toLowerCase().includes(q);
      let foundLine: string | undefined = undefined;

      for (const stanza of poem.stanzas) {
        for (const line of stanza) {
          if (line.toLowerCase().includes(q)) {
            foundLine = line;
            break;
          }
        }
        if (foundLine) break;
      }

      if (inTitle || foundLine) {
        hits.push({
          type: 'poem',
          title: poem.title,
          category: `Poem ${String(poem.number).padStart(2, '0')} of 24`,
          url: `/poems/${poem.slug}`,
          snippet: foundLine,
          poemNumber: poem.number,
        });
      }
    });

    // Search in quotation
    if (bookData.quotation.quote.toLowerCase().includes(q)) {
      hits.push({
        type: 'book',
        title: 'The Core Quotation',
        category: 'Book Epigraph',
        url: '/book#quotation',
        snippet: bookData.quotation.quote,
      });
    }

    // Search in dedication
    for (const d of bookData.dedication.text) {
      if (d.toLowerCase().includes(q)) {
        hits.push({
          type: 'book',
          title: 'Dedication',
          category: 'Front Matter',
          url: '/book#dedication',
          snippet: d,
        });
        break;
      }
    }

    // Search in tributes
    for (const t of bookData.tributes.text) {
      if (t.toLowerCase().includes(q)) {
        hits.push({
          type: 'book',
          title: 'Tributes to Family & Teachers',
          category: 'Acknowledgements',
          url: '/book#tributes',
          snippet: t.slice(0, 180) + '...',
        });
        break;
      }
    }

    // Search in preface
    for (const p of bookData.preface.paragraphs) {
      if (p.toLowerCase().includes(q)) {
        hits.push({
          type: 'book',
          title: 'Author’s Preface',
          category: 'Introduction',
          url: '/book#preface',
          snippet: p.slice(0, 180) + '...',
        });
        break;
      }
    }

    // Search in author bio
    for (const b of bookData.aboutPoet.biography) {
      if (b.toLowerCase().includes(q)) {
        hits.push({
          type: 'book',
          title: 'About Cyril Edwin R',
          category: 'Biography',
          url: '/about',
          snippet: b.slice(0, 180) + '...',
        });
        break;
      }
    }

    setResults(hits);
  }, [query, setSearchParams]);

  const highlight = (text: string, q: string) => {
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

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <header className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-burgundy font-semibold">
            Anthology Search
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-ink font-light tracking-wide uppercase">
            Search Archive
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-ink-muted">
            Find specific verses, titles, or reflections across Love’s Journey.
          </p>
        </header>

        {/* Search input field */}
        <div className="relative mb-12">
          <div className="flex items-center border-b-2 border-rule focus-within:border-burgundy transition-colors py-3">
            <Search className="w-5 h-5 text-burgundy mr-4 stroke-[1.75]" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. promise, frozen lake, stars, rain)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent font-serif text-xl sm:text-2xl text-ink placeholder:text-ink-light/60 focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Results Info */}
        {query.trim().length >= 2 && (
          <div className="mb-8 flex items-center justify-between text-xs font-sans tracking-[0.18em] uppercase text-ink-light pb-4 border-b border-rule">
            <span>
              {results.length} {results.length === 1 ? 'record' : 'records'} found for “{query}”
            </span>
          </div>
        )}

        {/* Empty state when no query */}
        {query.trim().length < 2 && (
          <div className="py-16 text-center text-ink-muted space-y-6">
            <BookOrnament variant="small" />
            <p className="font-serif italic text-lg">
              Explore the verses by topic or keyword
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto pt-2">
              {['Stars', 'Frozen Lake', 'Campus', 'Promises', 'Dawn', 'Struggles', 'Rain', 'Light', 'Silence', 'Cart'].map((k) => (
                <button
                  key={k}
                  onClick={() => setQuery(k)}
                  className="px-3 py-1.5 bg-paper-50 border border-rule hover:border-burgundy hover:text-burgundy rounded-sm text-xs font-sans tracking-wider uppercase transition-colors"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="divide-y divide-rule">
          {results.map((item, idx) => (
            <Link
              key={idx}
              to={item.url}
              className="py-6 flex items-start justify-between group hover:bg-paper-200/50 px-4 -mx-4 rounded-sm transition-colors"
            >
              <div className="space-y-1.5 pr-6">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-burgundy font-semibold">
                  {item.category}
                </span>
                <h2 className="font-display text-2xl text-ink group-hover:text-burgundy transition-colors font-medium">
                  {highlight(item.title, query)}
                </h2>
                {item.snippet && (
                  <p className="font-serif italic text-base text-ink-muted leading-relaxed pt-1">
                    “{highlight(item.snippet, query)}”
                  </p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-ink-light group-hover:text-burgundy group-hover:translate-x-1.5 transition-all mt-3 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
