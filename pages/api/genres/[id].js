import Book from "@/models/book";
import Author from "@/models/author";
import Genres from "@/models/genre";
import dbConnect from "@/db-connection/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query; 

    if (!id) {
      return res.status(400).json({ message: "Genre ID is required" });
    }

    try {
      await dbConnect();
      const genre = await Genres.findOne({ id });

      if (!genre) {
        return res.status(404).json({ message: "Genre not found" });
      }

      const books = await Book.find({ genreId: genre.id });

      if (!books || books.length === 0) {
        return res.status(404).json({ message: "No books found for this genre" });
      }

      const authors = await Author.find();

      const result = books.map((book) => {
        const author = authors.find((a) => a.id.toString() === book.authorId.toString());

        return {
          id: book._id,
          title: book.title,
          description: book.description,
          price: book.price,
          rating: book.rating,
          author: author ? author.name : "Author",
          genre: genre.name,
        };

      });

      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
