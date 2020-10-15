import mongoose from 'mongoose';
 
const dataSchema = new mongoose.Schema({
    Age:Number
});
 
const healthcare = mongoose.model('healthcare', dataSchema,'healthcare',true);
export default healthcare;
