const express=require('express');
const Product = require('../model/Products');
const Review = require('../model/Review');
const { validReview,isProductAuthor } = require('../middleware');
const router=express.Router();//mini appli cation
   

router.post('/products/:id/rating', validReview,async(req,res)=>{
  try{
   let{rating,comment}=req.body;
   let{id}=req.params;
   let userId=req.user._id;
   let product= await Product.findById(id);
   let review=new Review({rating,comment,users:req.user._id})
   product.reviews.push(review)
   await product.save();
   await review.save();
   req.flash('success','Review Added Sucessfully')
   res.redirect(`/products/${id}`)
  }
  catch(e){
   res.render('error',{err:e.message})
  }
})












module.exports=router;