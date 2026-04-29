import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

email:{
type:String
},

company:{
type:String
},

website:{
type:String
},

address:{
type:String
},

city:{
type:String
},

state:{
type:String
},

country:{
type:String
},

projectName:{
type:String
},

projectType:{
type:String
},

price:{
type:Number,
required:true
},

advance:{
type:Number,
default:0
},

remaining:{
type:Number
},

paymentStatus:{
type:String,
enum:["Pending","Partial","Paid"],
default:"Pending"
},

deadline:{
type:Date
},

status:{
type:String,
enum:["New","In Discussion","Confirmed","Completed"],
default:"New"
},

notes:{
type:String
}

},{timestamps:true});

export default mongoose.model("Client",clientSchema);