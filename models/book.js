import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    genreId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { collection: 'Book' } 
);

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);

export default Book;
