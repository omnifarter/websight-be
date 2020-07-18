import mongoose from 'mongoose';
import 'dotenv/config.js'
import retirement from './retirement.js';
 
const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URL);
};
 
const models = { retirement };
 
export { connectDb };
 
export default models;
