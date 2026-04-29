import express from "express";

import {
createContact,
getContacts,
getContactById,
deleteContact
} from "../controllers/contactController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();


// CLIENT WEBSITE
router.post("/",createContact);


// ADMIN
router.get("/",protect,getContacts);

router.get("/:id",protect,getContactById);

router.delete("/:id",protect,deleteContact);

export default router;