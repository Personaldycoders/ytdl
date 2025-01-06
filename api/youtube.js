const { youtube } = require('btch-downloader');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'You must provide a URL' });
  }

  try {
    const data = await youtube(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from YouTube', details: error.message });
  }
}
