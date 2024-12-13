import dbConnect from '@/db-connection/mongodb';
import SearchHistory from '@/models/history';

const handler = async (req, res) => {
    if(req.method === 'GET'){
        try {
            const { userId } = req.query;
            const searches = await SearchHistory.find({ userId });
            if (!searches) {
              return res.status(404).json({ success: false, message: 'No search history found' });
            }
            res.status(200).json({ success: true, data: searches });
          } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }
    else if (req.method === 'POST') {
        const { userId, searchQuery } = req.body;

        if (!userId || !searchQuery) {
        return res.status(400).json({ message: 'User ID and search query are required' });
        }

        try {
        await dbConnect();

        const newSearchHistory = new SearchHistory({
            userId,
            searchQuery,
        });

        await newSearchHistory.save();

        res.status(200).json({ message: 'Search query added to history' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
