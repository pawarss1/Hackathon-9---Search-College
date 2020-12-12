const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const { connection } = require('./connector')

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose');


app.get("/findColleges", async (req, res) => {
    let queryCond = {}
    if(req.query.name){
       queryCond.name={$regex:req.query.name,$options:"i"};
    }
    if(req.query.state){
        queryCond.state={$regex:req.query.state,$options:"i"};
    }
    if(req.query.city){
        queryCond.city={$regex:req.query.city,$options:"i"};
    }
    if(req.query.course){
        queryCond.course={$regex:req.query.course,$options:"i"};
    }
    if(req.query.exams){
        queryCond.exam =  {$regex:req.query.exams, $options:"i"};
    }
    if(req.query.minPackage && !isNaN(Number(req.query.minPackage)) && Number(req.query.minPackage) > 0){
        const curPack = Number(req.query.minPackage);
        queryCond.minPackage = { $gte: curPack }
    }
    if(req.query.maxFees && !isNaN(Number(req.query.maxFees)) && Number(req.query.maxFees) > 0){
        const curFees = Number(req.query.maxFees);
        queryCond.maxFees = { $lte: curFees }
    }
    res.send(await connection.find(queryCond));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;