import Contact from "../models/Contact.js";


// CREATE CONTACT (CLIENT SIDE)
export const createContact = async (req,res)=>{
try{

const { name,email,phone,projectType,budget,message } = req.body;

const contact = new Contact({
 name,
 email,
 phone,
 projectType,
 budget: budget ? Number(budget) : undefined,
 message
});

await contact.save();

res.status(201).json({
 message:"Message sent successfully",
 contact
});

}catch(error){

console.error("CONTACT ERROR:",error);

res.status(500).json({
 message:"Server error",
 error:error.message
});

}
};

// GET ALL CONTACTS (ADMIN)
export const getContacts = async (req,res)=>{

try{

const contacts = await Contact.find().sort({createdAt:-1});

res.json(contacts);

}catch(error){

res.status(500).json({error:error.message});

}

};



// GET SINGLE CONTACT
export const getContactById = async (req,res)=>{

try{

const contact = await Contact.findById(req.params.id);

if(!contact){
return res.status(404).json({message:"Contact not found"});
}

res.json(contact);

}catch(error){

res.status(500).json({error:error.message});

}

};



// DELETE CONTACT
export const deleteContact = async (req,res)=>{

try{

await Contact.findByIdAndDelete(req.params.id);

res.json({
message:"Contact deleted"
});

}catch(error){

res.status(500).json({error:error.message});

}

};