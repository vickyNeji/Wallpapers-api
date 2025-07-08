import { StatusCodes } from "http-status-codes";
import Wallpaper from "../models/wallpaper.js";
import BadRequestError from "../error/bad-request.js";

const getRadomWallpapers = async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  const skip = (page - 1) * limit;

  const wallpapers = await Wallpaper.find()
    .sort({ totalViews: -1, _id: 1 })
    .skip(skip)
    .limit(limit);
  res.status(StatusCodes.OK).json({
    message: "Random Wallpapers fetched successfully",
    data: wallpapers,
    totalResults: wallpapers.length,
  });
};

const getWallpapersByCategory = async (req, res) => {
  const categoryPassed = req.query.category;
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  const skip = (page - 1) * limit;

  if (!categoryPassed) {
    throw new BadRequestError("Please provide category");
  }

  const wallpapers = await Wallpaper.find({
    category: categoryPassed,
  })
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({
    message: "Category-wise wallpapers fetched successfully",
    data: wallpapers,
    totalResults: wallpapers.length,
  });
};

const updateWallViewCount = async (req, res) => {
  const wallpaperId = req.params.wallpaperId;
  const wallpaper = await Wallpaper.findOneAndUpdate(
    {
      _id: wallpaperId,
    },
    { $inc: { totalViews: 1 } },
    { new: true }
  );

  if (!wallpaper) {
    throw new BadRequestError("Invalid id provided");
  }

  res.status(StatusCodes.OK).json({
    message: "Updated Successfully",
    data: wallpaper,
  });
};

export default {
  getRadomWallpapers,
  getWallpapersByCategory,
  updateWallViewCount,
};
