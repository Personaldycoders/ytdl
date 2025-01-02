import { youtube } from "btch-downloader";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    console.log('Fetching data for URL:', url); // Log URL yang diterima
    const result = await youtube(url);

    // Log hasil dari API untuk memastikan response
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
    console.error('Error occurred:', error); // Log error untuk debugging

    return res.status(500).json({
      success: false,
      error: error.message || 'Something went wrong',
    });
  }
}
