import { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/youtube?url=${encodeURIComponent(url)}`, {
        method: 'GET',
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
    <div className="container">
      <h1>YouTube Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>

      {error && <p className="error">Error: {error}</p>}
      {data && (
        <div className="video-details">
          <h3>Video Details</h3>
          <img src={data.thumbnail} alt={data.title} />
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Channel:</strong> <a href={data.channel} target="_blank" rel="noopener noreferrer">{data.name}</a></p>
          <p><strong>Views:</strong> {data.views}</p>
          <p><strong>Published:</strong> {data.ago}</p>
          <p><strong>Description:</strong> {data.description}</p>

          <div className="download-links">
            <a href={data.mp3} target="_blank" rel="noopener noreferrer">Download MP3</a>
            <a href={data.mp4} target="_blank" rel="noopener noreferrer">Download MP4</a>
          </div>
        </div>
      )}
    </div>
  );
}
