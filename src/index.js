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


app.get('/retirement', async (req, res) => {
    const retirement = await models.retirement.find({category:req.query.category});
    return res.send(retirement);
  });

app.get('/housing', async(req,res) =>{
    let general = await models.housing.find({property:null,property2:null})
    let property2 = await models.housing.find({property:null,property2:req.query.property2,category2:req.query.category2})
    let bothProperty = await models.housing.find({
        property:req.query.property,
        category:req.query.category,
        property2:req.query.property2,
        category2:req.query.category2
    })
    let housing = general.concat(property2,bothProperty)
    return res.send(housing)
})

app.get('/healthcare',async (req,res)=>{
    //REQUEST FORMAT:
    // {
    //     property:'age',
    //     category:0,
    //     property1:'ageGeneration',
    //     category1:0,
    //     property2:'ISP',
    //     category:true,
    //     property3:'PEC',
    //     category:true
    // }
    let coverage = await models.healthcare.find({
        property2:req.query.property2,
        category2:req.query.category2,
        property3:req.query.property3,
        category3:req.query.category3,
        topic:'Coverage'})
    //get the general one too
    coverage = coverage.concat(await models.healthcare.find({property:null,property2:null,property3:null,topic:'Coverage'}))

    let premiums = await models.healthcare.find({property:null,property2:null,property3:null,topic:'Premiums'})
    if(req.query.property2){
        if(req.query.category3){    
            premiums=premiums.concat(await models.healthcare.find({topic:'Premiums',property:null,category3:true}))
        }
        if(req.query.category1!==-1){
            premiums=premiums.concat(await models.healthcare.find({property:'ageGeneration',category:req.query.category1}))
        }    
    }

    let awl = await models.healthcare.find({property:null,topic:'Additional Withdrawal Limits'})
    awl =awl.concat(await models.healthcare.find({property:req.query.property,category:req.query.category,topic:'Additional Withdrawal Limits'}))

    let results = coverage.concat(premiums,awl)

    return res.send(results)
})

