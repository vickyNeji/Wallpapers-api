import express from "express";
import userController from "../controller/userController.js";

const { getRadomWallpapers, getWallpapersByCategory, updateWallViewCount } =
  userController;

const router = express.Router();

router.route("/getRandomWallpapers").get(getRadomWallpapers);

router.route("/getWallpapersByCategory").get(getWallpapersByCategory);

router.route("/updateWallViewCount/:wallpaperId").patch(updateWallViewCount);

export default router;
