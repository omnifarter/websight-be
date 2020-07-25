import mongoose from 'mongoose';
import 'dotenv/config.js'
import retirement from './retirement.js';
import housing from './housing.js'
import healthcare from './healthcare.js'
const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URL);
};
 
const models = { retirement,housing,healthcare };
 
export { connectDb };
 
export default models;
