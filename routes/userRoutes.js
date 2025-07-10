import express from "express";
import userController from "../controller/userController.js";

const {
  getRadomWallpapers,
  getWallpapersByCategory,
  updateWallViewCount,
  getWallpaperById,
} = userController;

const router = express.Router();

router.route("/getRandomWallpapers").get(getRadomWallpapers);

router.route("/getWallpapersByCategory").get(getWallpapersByCategory);

router.route("/updateWallViewCount/:wallpaperId").patch(updateWallViewCount);

router.route("/getWallpaperById/:wallpaperId").get(getWallpaperById);

export default router;
