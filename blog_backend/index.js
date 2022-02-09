const express = require('express');
const cors = require('cors');
const ArticleInfo = require('./src/model/BlogDB');
//Object initialization
const app= express();
app.use(cors());

//for POST method-use below since bodyparser is outdated 
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Fake DB
const articleInfo = {
    'node': {
        upvotes: 0,
        comments: []
    },
    'react': {
        upvotes: 0,
        comments: []
    },
    'express': {
        upvotes: 0,
        comments: []
    }
}

// app.get('/api/article/:name',(req,res)=>{
//     const articleName = req.params.name;
//     ArticleInfo.findOne({name:articleName})
//     .then(function(article){
//         res.json(article);
//     })
// })


//Basic Article Fetch Route 
app.get('/api/article/:name',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try{
        const articleName = req.params.name;
        ArticleInfo.findOne({name:articleName})
        .then(function(article){
            res.status(200).json(article);
        })
    }
    catch(error){
        res.status(500).json({message:'Error',error});
    }
})

//Upvotes Routing
app.post('/api/article/:name/upvotes',(req,res)=>{
    const articleName = req.params.name;
    const filter = {name:articleName};
    const update = {$inc:{upvotes:1}};
    ArticleInfo.findOneAndUpdate(filter,update,{new:true})
    .then(function(article){
        res.json(article);
    })
    // articleInfo[articleName].upvotes +=1;
    // res.send(`${articleName} now has ${articleInfo[articleName].upvotes} upvotes`)
})

// Comments Routing
app.post('/api/article/:name/comments', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const filter = {name:articleName};
    const update = {$push:{comments:{username,text}}};
    ArticleInfo.findOneAndUpdate(filter,update,{new:true})
    .then(function(article){
        res.json(article);
    })
})


//Backend  Routing
// app.get('/',function(req,res){
//     res.send("Blog Server Up!");
// })

// app.post('/',function(req,res){
//     res.send(`Hi ${req.body.name} post is working`);
// })

// app.get('/article/:name',function(req,res){
//     res.send(`Hi ${req.params.name} URL parameter is working`);
// })

//Port Number
app.listen(5000,()=>{
console.log("Listening on port 5000");
})