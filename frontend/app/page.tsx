'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSearch = async () => {
    if (!file || !keywords) {
      setError('Please upload a file and enter keywords.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('keywords', keywords);

    try {
      const res = await fetch('https://your-backend.onrender.com/api/search', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResults(data.results);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">PDF Cause List Search</h1>

        <div className="mb-4">
          <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-2" />
          <input
            type="text"
            placeholder="Enter keywords (comma separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            {results.map((result, idx) => (
              <div key={idx} className="border p-4 rounded-lg bg-gray-50">
                <p><strong>Page:</strong> {result.page}</p>
                <p><strong>Keywords Found:</strong> {result.keywords.join(', ')}</p>
                <p><strong>Judge:</strong> {result.judge}</p>
                <p><strong>VC Link:</strong> <a href={result.vc_link} target="_blank" className="text-blue-600 underline">{result.vc_link}</a></p>
                <p><strong>Court Number:</strong> {result.court_number}</p>
                <p><strong>Serial Number:</strong> {result.serial_number}</p>
                <p><strong>Case Title:</strong> {result.case_title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
