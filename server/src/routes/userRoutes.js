import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All user management routes require auth

router.route('/')
  .get(authorize('admin', 'manager'), getUsers);

router.route('/:id')
  .get(authorize('admin', 'manager'), getUserById)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

export default router;
