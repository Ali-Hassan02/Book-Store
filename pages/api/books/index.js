import Book from "@/models/book";
import Author from "@/models/author";
import Genres from "@/models/genre";
import dbConnect from "@/db-connection/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const books = await Book.find();

      const authors = await Author.find();
      const genres = await Genres.find();
      const result = books.map((book) => {
        const author = authors.find((a) => a.id.toString() === book.authorId.toString());
        const genre = genres.find((g) => g.id.toString() === book.genreId.toString());

        return {
          id: book._id,
          title: book.title,
          description: book.description,
          price: book.price,
          rating: book.rating,
          author: author ? author.name : "Author",
          genre: genre ? genre.name : "Genre",
        };
      });

      console.log(result);
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
