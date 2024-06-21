
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user";
import { Router } from "express";
import { errorHandler } from "../error_handler";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
  }
});

// File type filter
function fileFilter(req, file, cb) {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only .png, .jpeg, .jpg, .svg files are allowed!'), false); // Reject file
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});
const userRoutes: Router = Router();

userRoutes.get("/getUsers", errorHandler(getUsers) as any);
userRoutes.get("/getUser/:username", errorHandler(getUser) as any);
userRoutes.post("/createUser", errorHandler(createUser) as any);
userRoutes.post("/updateUser/:username",upload.single('image'), errorHandler(updateUser) as any);
userRoutes.delete("/deleteUser/:username", errorHandler(deleteUser) as any);

export default userRoutes;
