import mongoose from 'mongoose';
 
const dataSchema = new mongoose.Schema({
    text:String,
    type:String,
    topic:String,
    property:String,
    category:String,
    property2:String,
    category2:Boolean,
    property3:String,
    category3:Boolean,
});
 
const healthcare = mongoose.model('healthcare', dataSchema,'healthcare',true);
export default healthcare;
