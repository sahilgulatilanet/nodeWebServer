const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    fs.appendFile('server.log',`${now}: ${req.method}, ${req.url}`,(err)=>{
        if(err){
            console.log(err);
        }
    });
    console.log(`${now}: ${req.method}, ${req.url}`);
    next();
});
/*app.use((req,res,next)=>{
    res.render('mantainence.hbs');
});*/
app.use(express.static(__dirname+'/public'));
hbs.registerHelper("getfullyear",()=>{
    return new Date().getFullYear();
});
hbs.registerHelper("getmsg",(txt1)=>{
    return txt1;
});
app.get("/",(req,res)=>{
    //res.send("<h1>hello express</h1>");
    res.send({
        name:'sahil',
        likes:[
            'bikes',
            'car',
            'beaches'
        ]
    });
});
app.get("/about",(req,res)=>{
    //res.send("<h1>about</h1>");
    res.render('about.hbs',{
        pagetitle : "About Page"
        //year: new Date().getFullYear()
});
});
app.listen(3000,()=>{
    console.log('server up');
});
