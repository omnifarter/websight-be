import mongoose from 'mongoose';
 
const dataSchema = new mongoose.Schema({
    text:String,
    type:String,
    topic:String,
    property:String,
    category:String
});
 
const retirement = mongoose.model('retirement', dataSchema,'retirement');
export default retirement;
