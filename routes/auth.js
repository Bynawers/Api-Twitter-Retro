import express from "express";
import multer from "multer";
import { login,register,getImage } from "../controllers/auth.js";
import { requestPasswordReset, resetPassword } from "../controllers/auth.js";
import path from 'path';
import { fileURLToPath } from 'url'; 


const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  /* ROUTES WITH FILES */
router.post("/register", upload.single("avatar"), register);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

router.post("/login", login);

router.get("/image/:userId",getImage);

export default router;
