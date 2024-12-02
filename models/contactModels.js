const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    email:{type:String,unique:true,sparse:true},
    phoneNumber:{type:String,unique:true,sparse:true},
    isPrimary:{type:Boolean,default:false},
    primaryContactId:{type:mongoose.Schema.Types.ObjectId,ref:"ContactInformation"},
    secondaryContactId:[{type:mongoose.Schema.Types.ObjectId,ref:"ContactInformation"}],
},{timestamps:true});

const contactInformation = mongoose.model("ContactInformation",contactSchema)
module.exports = contactInformation