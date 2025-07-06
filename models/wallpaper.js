import mongoose from "mongoose";

const WallpaperSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide wallpaper name"],
  },
  url: {
    type: String,
    required: [true, "Please provide wallpaper link"],
  },
  category: {
    type: String,
    enum: [
      "anime",
      "games",
      "sports",
      "abstract",
      "nature",
      "ghibli",
      "motivational",
      "minimalist",
      "superheroes",
      "space",
    ],
  },

  totalViews: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Wallpapers", WallpaperSchema);
