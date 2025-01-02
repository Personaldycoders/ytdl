const { youtube } = require('btch-downloader'); // Menggunakan require untuk btch-downloader
const fetch = require('node-fetch'); // Menggunakan require untuk node-fetch

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    console.log('Fetching data for URL:', url);
    const result = await youtube(url);

    console.log('Result:', result);

    return res.status(200).json({
      success: true,
      data: {
        title: result.title,
        description: result.description || "No Description",
        image: result.image,
        thumbnail: result.thumbnail,
        duration: result.duration,
        views: result.views,
        channel: result.channel,
        mp3: result.mp3,
        mp4: result.mp4
      },
    });
  } catch (error) {
    console.error('Error occurred:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Something went wrong',
    });
  }
};
