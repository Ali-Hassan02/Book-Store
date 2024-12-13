import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
  },
  { collection: 'Author' }
);

const Author = mongoose.models.Author || mongoose.model('Author', AuthorSchema);

export default Author;
