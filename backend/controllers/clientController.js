import Client from "../models/Client.js";


// CREATE CLIENT
export const createClient = async (req,res)=>{

try{

const data = req.body;

data.remaining = data.price - (data.advance || 0);

const client = new Client(data);

await client.save();

res.status(201).json({
message:"Client created successfully",
client
});

}catch(error){

res.status(500).json({error:error.message});

}

};



// GET ALL CLIENTS
export const getClients = async (req,res)=>{

try{

const clients = await Client.find().sort({createdAt:-1});

res.json(clients);

}catch(error){

res.status(500).json({error:error.message});

}

};



// GET SINGLE CLIENT
export const getClientById = async (req,res)=>{

try{

const client = await Client.findById(req.params.id);

if(!client){
return res.status(404).json({message:"Client not found"});
}

res.json(client);

}catch(error){

res.status(500).json({error:error.message});

}

};



// UPDATE CLIENT
export const updateClient = async (req,res)=>{

try{

const data = req.body;

if(data.price){
data.remaining = data.price - (data.advance || 0);
}

const client = await Client.findByIdAndUpdate(
req.params.id,
data,
{new:true}
);

res.json({
message:"Client updated",
client
});

}catch(error){

res.status(500).json({error:error.message});

}

};



// DELETE CLIENT
export const deleteClient = async (req,res)=>{

try{

await Client.findByIdAndDelete(req.params.id);

res.json({
message:"Client deleted successfully"
});

}catch(error){

res.status(500).json({error:error.message});

}

};