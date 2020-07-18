import 'dotenv/config.js';
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import models, {connectDb} from './models/index.js';

const app = express();
app.use(cors());
const eraseDatabaseOnSync = false;

  
connectDb().then(async()=>{
    app.listen(process.env.MONGO_PORT,()=>{
        console.log('App listening on port ' + process.env.MONGO_PORT )
    })
})


app.get('/', async (req, res) => {
    const retirement = await models.retirement.find({category:req.query.category});
    return res.send(retirement);
  });

