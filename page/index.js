import { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      // Menambahkan query parameter '?url=' di URL API
      const response = await fetch(`/api/youtube?url=${encodeURIComponent(url)}`, {
        method: 'POST', // Tetap POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }), // Kirim URL dalam body, meskipun sudah ada di query string
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div>
      <h1>YouTube Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>

      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h3>Download Info</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
