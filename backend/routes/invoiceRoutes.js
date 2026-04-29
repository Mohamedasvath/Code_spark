import express from "express";

import {
  getInvoices,
  createInvoice,
  downloadInvoice,
  deleteInvoice
} from "../controllers/invoiceController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect,getInvoices);
router.post("/",protect,createInvoice);

router.get("/:id",protect,downloadInvoice);
router.delete("/:id",protect,deleteInvoice);

export default router;