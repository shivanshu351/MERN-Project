import express from 'express'
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { deleteProducts, getProducts , addProducts , updateProducts} from '../controller/product.controller.js';

const router = express.Router();

router.get('/',getProducts)
router.post('/', addProducts)
router.delete('/:id',deleteProducts )
router.put('/:id',updateProducts)

export default router;
