import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true
},

phone:{
type:String
},

projectType:{
type:String
},

budget:{
type:Number
},

message:{
type:String
},

status:{
type:String,
enum:["New","Contacted","Closed"],
default:"New"
}

},{timestamps:true});

export default mongoose.model("Contact",contactSchema);