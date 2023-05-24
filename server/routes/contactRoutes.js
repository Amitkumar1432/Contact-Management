import express from "express";
import { createContact, deleteContact, getContact, getContacts, updateContact } from "../controllers/contactController.js";
import validateToken from "../middleware/validateToken.js";
const router=express.Router();

router.use(validateToken);

router.get("/",getContacts);
router.post("/",createContact);
router.put("/update/:id",updateContact);
router.get("/find/:id",getContact);
router.delete("/delete/:id",deleteContact);

export default router;