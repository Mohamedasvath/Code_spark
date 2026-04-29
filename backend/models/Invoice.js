import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({

clientId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Client"
},

projectName:String,

price:Number,

advance:Number,

remaining:Number,

invoiceNumber:String,

date:{
type:Date,
default:Date.now
}

},{timestamps:true});

export default mongoose.model("Invoice",invoiceSchema);