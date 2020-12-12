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
    if(req.body.name){
       queryCond.name={$regex:req.body.name,$options:"i"};
    }
    if(req.body.state){
        queryCond.state={$regex:req.body.state,$options:"i"};
    }
    if(req.body.city){
        queryCond.city={$regex:req.body.city,$options:"i"};
    }
    if(req.body.course){
        queryCond.course={$regex:req.body.course,$options:"i"};
    }
    if(req.body.exams){
        queryCond.exam =  req.body.exams;
    }
    if(req.body.minPackage && !isNaN(Number(req.body.minPackage)) && Number(req.body.minPackage) > 0){
        const curPack = Number(req.body.minPackage);
        queryCond.minPackage = { $gte: curPack }
    }
    if(req.body.maxFees && !isNaN(Number(req.body.maxFees)) && Number(req.body.maxFees) > 0){
        const curFees = Number(req.body.maxFees);
        queryCond.maxFees = { $lte: curFees }
    }
    res.send(await connection.find(queryCond));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;