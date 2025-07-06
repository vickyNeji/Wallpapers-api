import Wallpaper from "../models/wallpaper.js";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import fs from "fs";

const addWallpaper = async (req, res) => {
  try {
    const folder = req.body.folder;

    const uploadPromises = req.files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: folder || "default-folder",
        });

        fs.unlinkSync(file.path); // Delete after successful upload
        return result.secure_url;
      } catch (uploadError) {
        console.error(
          `Error uploading file ${file.originalname}:`,
          uploadError
        );
        // Ensure the temporary file is deleted even if upload fails
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error(`Error deleting temp file ${file.path}:`, unlinkError);
        }
        return null; // Return null for failed uploads
      }
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.filter((url) => url !== null); // Filter out failed uploads

    if (urls.length === 0 && req.files.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "No files were successfully uploaded.",
      });
    }

    urls.forEach((url) => {
      // save to database here
      uploadWallpaper(Date.now(), url, folder);
    });

    res.status(StatusCodes.OK).json({
      message: "Wallpaper added successfully",
    });
  } catch (error) {
    console.error("Overall error in addCategory:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const addWallpaperToDb = async (req, res) => {
  const wallpaper = await Wallpaper.create({
    name: "first_wallpaper",
    url: "dsaddas",
    category: "anime",
  });

  if (wallpaper) {
    res.status(StatusCodes.CREATED).json({
      message: "wallpaper added successfully",
    });
  }
};

async function uploadWallpaper(file, result, folder) {
  const uploadFile = await Wallpaper.create({
    name: file,
    url: result,
    category: folder,
  });
  return uploadFile;
}

export default { addWallpaper, addWallpaperToDb };
