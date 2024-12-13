import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "Genres" }
);

const Genres = mongoose.models.Genres || mongoose.model("Genres", GenreSchema);

export default Genres;
