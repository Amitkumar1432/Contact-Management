import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
//Get all contacts
//route  POST /api/contacts

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

//create a new contact
//route  POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });
  res.status(201).json(contact);
});

//get a contact
//route  GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//update a contact
//route  put /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  //checking whether the contact blongs to the user or not
  if(req.user.id !== contact.user_id.toString()){
    res.status(403);
    throw new Error("user can't update another users contact");
  }

  const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.status(200).json(updatedContact);
});

//delete a contact
//route  delete /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  const deletedContact=await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedContact);
});

export { getContacts, createContact, getContact, updateContact, deleteContact };
