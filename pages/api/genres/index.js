import dbConnect from '@/db-connection/mongodb';  // Adjust the path if needed
import Genres from '@/models/genre';  // Adjust the path if needed

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const genres = await Genres.find(); // Fetch all genres from the database
      res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
