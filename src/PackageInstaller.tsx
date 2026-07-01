import React, { useState } from 'react';
import './PackageInstaller.css';

interface Package {
  name: string;
  version: string;
  description: string;
  authors: string[];
}

interface PackageInstallerProps {
  onInsert: (pkg: Package) => void;
  onClose: () => void;
}

export function PackageInstaller({ onInsert, onClose }: PackageInstallerProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/packages?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        console.error('Failed to fetch packages');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Install Typst Package</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search Typst Universe (e.g. table, chart)..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <div className="results-list">
          {results.length === 0 && !loading && (
            <div className="empty-state">No packages found.</div>
          )}
          {results.map((pkg, i) => (
            <div key={i} className="package-card">
              <div className="pkg-header">
                <h3>@{pkg.name}</h3>
                <span className="pkg-version">v{pkg.version}</span>
              </div>
              <p className="pkg-desc">{pkg.description}</p>
              <div className="pkg-footer">
                <span className="pkg-authors">By: {pkg.authors?.join(', ')}</span>
                <button 
                  className="insert-btn"
                  onClick={() => onInsert(pkg)}
                >
                  Import
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
