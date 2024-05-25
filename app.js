const express=require("express")
const app=express();
const path=require('path')
const seedDB=require("./seed")
const mongoose = require('mongoose');
const productRoutes=require('./routes/product')
const productReview=require('./routes/review')
const productCart=require('./routes/cart')
const methodOverride = require('method-override')
const session = require('express-session' );
const flash = require('connect-flash');
const authroutes=require('./routes/auth')
const productApi=require('./routes/api/productapi')
const passport = require("passport");
const User=require('./model/User')
const LocalStrategy = require('passport-local'); //pass
const dotenv=require("dotenv").config() //agar me iss kisi folder me daal deta too mhuje path ka use krna hota hai menas congig(path:"")

app.use(methodOverride('_method'))
mongoose.connect(process.env.URL)
.then(()=>{
    console.log('db connected')
})
.catch((err)=>{
    console.log('err is ',err)
})

// let configSession = {
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
    }
}

app.set('view engine','ejs');
app.set('views',path.join( __dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended :true}))
// seedDB() //comment kr do because nodemon harr barr isse mongodb me daal dega
app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());//pass
app.use(passport.session())//pass

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());//pass
passport.deserializeUser(User.deserializeUser());//pass

passport.use(new LocalStrategy(User.authenticate()));//pass
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next();
})
app.get("/",(req,res)=>{
    res.render("home");
})
app.use(productRoutes);
app.use(productReview);
app.use(authroutes)
app.use(productApi) 
app.use(productCart) 

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  port ${process.env.PORT}`);
})

//basic server
//mongoose connection
//model-> seed data kr dia
// routes-> views
// rating schema -> product change