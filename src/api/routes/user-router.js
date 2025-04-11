import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  removeUser,
  updateUserRole,
} from '../controllers/user-controller.js';
import {
  createThumbnail,
  authenticateToken,
  validationErrors,
} from '../../middlewares.js';
import {body} from 'express-validator';
import multer from 'multer';
import path from 'path';
const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrors,
    upload.single('file'),
    (req, res, next) => {
      if (!req.file) {
        return res
          .status(400)
          .json({errors: [{msg: 'File is required', param: 'file'}]});
      }
      next();
    },
    createThumbnail,
    postUser
  );

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, removeUser);

userRouter.put('/:id/role', authenticateToken, updateUserRole);

export default userRouter;
