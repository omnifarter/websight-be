import mongoose from 'mongoose';
 
const dataSchema = new mongoose.Schema({
    text:String,
    type:String,
    topic:String,
    property:String,
    category:String,
    property2:String,
    category2:String,
});
 
const housing = mongoose.model('housing', dataSchema,'housing',true);
export default housing;
