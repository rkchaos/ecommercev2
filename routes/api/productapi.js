const express=require("express")
const router=express.Router()
const{login}=require("../../middleware");
const User = require("../../model/User");


router.post("/products/:id/like",login,async (req,res)=>{
let{id}=req.params;
let user=req.user;
let isliked=user.whishlist.includes(id)
if(isliked){
 await User.findByIdAndUpdate(req.user._id,{$pull:{whishlist:id}})
}else{
  await  User.findByIdAndUpdate(req.user._id,{$addToSet:{whishlist:id}})
}
res.status(201).send('ok');
})






module.exports=router