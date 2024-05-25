const express=require("express")
const { login } = require("../middleware");
const User = require("../model/User");
const Product = require("../model/Products");
const router=express.Router()
const stripe=require("stripe")('sk_test_51PHlj2SArbXApH71rjD7bUlhRoHNLVDsb856mmmA31mpdxzR6ImkGUVdrus7TthiR6DPKeOGZsDBZ1w4spWb4lav00A6PCRCHC')
router.get("/user/cart",login,async(req,res)=>{
    let userId=req.user._id;
    let user=await User.findById(userId).populate("cart")

let totalAmount=user.cart.reduce((sum,curr)=>sum+curr.price,0)

    res.render("cart",{user,totalAmount})
})

router.get("/checkout/:id",async(req,res)=>{
    let userId=req.params.id
    let user=await User.findById(userId).populate("cart")   
let totalAmount=user.cart.reduce((sum,curr)=>sum+curr.price,0)
let quan=user.cart.length
    const session =await stripe.checkout.sessions.create({
         line_items: [{ 
           price_data: {
             currency: 'INR',
             product_data: {
               name: 'T-shirt',
             },
             unit_amount: totalAmount*100,
           },
           quantity: 1,
         }],
         mode: 'payment',
         success_url: 'https://example.com/success',
         cancel_url: 'https://example.com/cancel',
       });
       res.redirect(303,session.url)
 })
router.post("/user/:id/add",login,async (req,res)=>{
    let{id}=req.params;
    let userId=req.user._id;
let user=await User.findById(userId)
let product=await Product.findById(id)
user.cart.push(product);
await user.save();
res.redirect("/user/cart");
})
router.delete("/user/cart/:id",login,async (req,res)=>{
    let{id}=req.params
    let userId=req.user._id;
    let product=await Product.findById(id)
    let user=await User.findById(userId)
        user.cart.pull(product);
        await user.save();
res.redirect("/user/cart")
})


// router.post("/user/:id/cart",login,async(req,res)=>{
//     let{id}=req.params
//     let{quantity}=req.body
//     let userId=req.user._id;
//     let product=await Product.findById(id)
//     let user=await User.findById(userId)
//     user.quantity.push(quantity)
//     await user.save();
//     res.redirect("/user/cart")
// })

module.exports=router