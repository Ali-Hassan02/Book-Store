import Author from "@/models/author";
import dbConnect from "@/db-connection/mongodb";

export default async function handler(req, res) {
  const { id } = req.query;  // Get the author's ID from the URL query

  if (req.method === "GET") {
    try {
      await dbConnect();
      
      // Find the author by their custom 'id' field (not MongoDB's _id)
      const author = await Author.findOne({ id: id });

      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      // Send the author details as a response
      res.status(200).json(author);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
