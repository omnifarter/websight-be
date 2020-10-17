import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import models, {connectDb} from './models/index.js';

const app = express();
app.use(cors());
const eraseDatabaseOnSync = false;

  
connectDb().then(async()=>{
    app.listen(process.env.MONGO_PORT,()=>{
        console.log('App listening on port ' + process.env.MONGO_PORT)
    })
})


app.get('/retirement', async (req, res) => {
    console.log(req.query.age)
    const retirement = await models.retirement.find({
        $or:[ 
            {$and:
                [{"Age.0":{ $lte:parseInt(req.query.age)},"Age.1":{$gte:parseInt(req.query.age)}}]
            },
            {Age:null}
        ]});
    return res.send(retirement);
  });

app.get('/housing', async(req,res) =>{
    const housing = await models.housing.find({ $or: [{ Intent: req.query.intent }, { "Type of flat": req.query.HDBtype }, { "Type of loan": req.query.loan }] })
    return res.send(housing)
})

app.get('/healthcare',async (req,res)=>{
    const healthcare = await models.healthcare.find({
        $or:[ 
            {$and:
                [{"Age.0":{ $lte:parseInt(req.query.age)},"Age.1":{$gte:parseInt(req.query.age)}}]
            },
            {Age:null}
        ]
        ,
         "Has pre-existing condition": {$in:[req.query.PEC,null]},
         "has IPs": {$in:[req.query.loan,null]},
        "Generation":{$in:[req.query.generation,null]} 
    })

    return res.send(healthcare)
})

