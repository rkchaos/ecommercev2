const express=require('express');
const User = require('../model/User');
const passport = require('passport');
const router=express.Router();//mini application
   


router.get('/register' , (req,res)=>{
    res.render('signup');
})
router.post('/register',async(req,res)=>{
  try{
    let{username,email,gender,role,password}=req.body
    let user=new User({username,email,gender,role});
    let newUser=await User.register(user, password)
    // res.send(newUser)
    req.flash('success' , 'Created sucessfully')
    res.redirect('/products');
  }
  catch(err){
    req.flash('error' , 'username already use ')
    res.redirect('/register')
  }
})
router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',
  passport.authenticate('local', 
  { 
    failureRedirect: '/login', 
    failureMessage: true 
  }),
  function(req, res) {
    req.flash('success' , `Welcome Back ${req.user.username}`)
    res.redirect('/products');
});
router.get('/logout', function(req, res, next){
    req.logout(function() {
        
    req.flash('success' , 'logout successfully')
      res.redirect('/login');
    });
  });
module.exports=router;