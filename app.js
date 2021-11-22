const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbURL = "mongodb+srv://pizzaboy:test123456@nodetuts.cnfxy.mongodb.net/pizzaworld?retryWrites=true&w=majority";
const  Pizza = require('./models/food');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(function(result){
    
    console.log('database connected successfully!!!');
    app.listen(3000,function()
{
    console.log("The server has been started at port number 3000");
})
}).catch(function(err)
{
    console.log(err);
})



app.get('/',function(req,res)
{
   
    res.redirect('/pizzas');
})
app.get('/pizzas',function(req,res)
{
    Pizza.find().sort({createdAt:-1}).then(function(result)
    {
        res.render('list',{flag1:result,title:'PIZZAHOME'})
    }).catch(function(err)
    {
        console.log(err);
    })
})
app.get('/about',function(req,res)
{
    res.render("about",{title:'ABOUT'});
})
app.get('/contact',function(req,res)
{
    res.render("contact",{title:'CONTACT'});
})
app.get('/create',function(req,res)
{
    res.render("create",{title:'AddPizza'});
})
app.post('/pizzas',function(req,res)
{
   const pizza1 = new Pizza(req.body);
   pizza1.save().then(function(result)
   {
       res.redirect('/pizzas');
   }).catch(function(err)
   {
       console.log(err);
   })
})
app.get('/pizzas/:id',function(req,res)
{
    const id = req.params.id;
    Pizza.findById(id).then(function(result)
    {
        res.render("details",{flag2:result})
    }).catch(function(err)
    {
            console.log(err);
    })
})
app.post('/delete',function(req,res)
{
    const pizzaItem = req.body.checkbox;
    Pizza.findByIdAndRemove(pizzaItem,function(result)
    {
        res.redirect('/pizzas');
    }).catch(function(err)
    {
        console.log(err);
    })
})

app.use(function(req,res)
{
    res.status(404).render("404",{title:'404ERROR'});
})

