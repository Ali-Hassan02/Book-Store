import Author from "@/models/author";
import dbConnect from "@/db-connection/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
