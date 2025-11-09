import express from "express";
import { checkout } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);

export default router;
