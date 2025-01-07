const { youtube } = require('btch-downloader');
const cheerio = require('cheerio');
const got = require('got');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Log the URL to check if it's coming in correctly
  const { url } = req.query;
  console.log('Received URL:', url);

  if (!url) {
    return res.status(400).json({ error: 'You must provide a URL' });
  }

  try {
    // Fetch video data with custom User-Agent using got
    const data = await youtube(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    });
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    res.status(500).json({ error: 'Failed to fetch data from YouTube', details: error.message });
  }
}
