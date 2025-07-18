import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
