import Book from "@/models/book";
import Author from "@/models/author";
import Genres from "@/models/genre";
import dbConnect from "@/db-connection/mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect();
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      const authors = await Author.find();
      const genres = await Genres.find();

      const author = authors.find((a) => a.id.toString() === book.authorId.toString());
      const genre = genres.find((g) => g.id.toString() === book.genreId.toString());

      const result = {
        id: book.id,
        title: book.title,
        description: book.description,
        price: book.price,
        rating: book.rating,
        authorId: author ? author.id : 1,
        author: author ? author.name : "Author",
        genre: genre ? genre.name : "Genre",
      };
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
