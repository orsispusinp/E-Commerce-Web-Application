import express from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// Routes
router.post("/", createProduct);       // temporary route to add product
router.get("/", getAllProducts);       // get all products
router.get("/:id", getProductById);    // get single product

export default router;
