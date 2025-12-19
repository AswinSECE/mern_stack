import express from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
// Admin-only routes use both protect and admin middleware
router.post('/', protect, admin, createProduct);
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;

