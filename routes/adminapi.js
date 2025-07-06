import express from "express";
import upload from "../uploadUtil/multer.js";
import adminCOntroller from "../controller/adminController.js";
const { addWallpaper, addWallpaperToDb } = adminCOntroller;
const router = express.Router();

router.post("/uploadWallpaper", upload.array("images", 20), addWallpaper);

router.post("/addWallpaperToDb", addWallpaperToDb);

export default router;
