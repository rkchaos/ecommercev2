const express=require('express')
const router=express.Router();//mini application
const Product = require('../model/Products');
const Review = require('../model/Review');
const { validProduct,login,isSeller,isProductAuthor} = require('../middleware');
const User = require('../model/User');


router.get("/products",async(req,res)=>{
try{
    let product=await Product.find({}).limit(4);
let latest=await Product.find({}).sort({_id:-1}).limit(4)

res.render('index',{product,latest})
}
catch(e){
    res.status(500).render('error',{err:e.message})
}
});

router.get('/products/new',isSeller,login,(req,res)=>{
    try{
        res.render('new')
    }
    catch(e){
        res.render('error',{err:e.message})
    }
})


router.post('/products',login, isSeller,validProduct, async(req,res)=>{
   try{
    let{name,img,price,desc,category,company}=req.body;
    await Product.create( { name , img , price , desc,category,company,author:req.user._id } )//automaticaaly store
 res.redirect('/products')
   }
   catch(e){
    res.render('error',{err:e.message})
   }
})

// show particular products
router.get('/products/:id',login, async (req, res) => {

try{
    let {id}=req.params;
let foundProducts =await Product.findById(id).populate('reviews');  // find the id in database
let review=await Review.find({})
res.render('show',{foundProducts,review,success:req.flash('success')});   // render that data to ejs file
} 
catch(e){
    res.render('error',{err:e.message})
   }

})
//show edit form
router.get('/products/:id/edit',login, isSeller,isProductAuthor,async(req,res)=>{
   try{
    let {id}=req.params;
    let foundProducts =await Product.findById(id);  // find the id in database
   
    res.render('edit',{foundProducts,author:req.user._id});
   }
   catch(e){
    res.render('error',{err:e.message})
   }
    
})
router.patch("/products/:id",login,isSeller, validProduct, async(req,res)=>{
try{
    let {id}=req.params;
    let{name,img,price,desc,category,company}=req.body;
   await Product.findByIdAndUpdate(id,{name,img,price,desc,category,company});
   req.flash('success' , 'Product edited successfully');
   res.redirect(`/products`)
}
catch(e){
    res.render('error',{err:e.message})
   }
})
router.delete("/products/:id",login,isSeller, async(req,res)=>{
   try{
     let {id}=req.params;
    let foundProducts =await Product.findById(id);
    // delete reviews before delete the product
    for(let id of  foundProducts.reviews){
      await  Review.findByIdAndDelete(id);
    }
    // let{name,img,price,desc}=req.body;
   await Product.findByIdAndDelete(id);
   req.flash('success' , 'Product delect successfully');
res.redirect('/products')
   }
   catch(e){
    res.render('error',{err:e.message})
   }
})
router.delete("/products/review/:id",async(req,res)=>{
    try{
let{id}=req.params;
await  Review.findByIdAndDelete(id);
req.flash('success' , 'review delect successfully');
res.redirect("/products")
    }
    catch(e){
        res.render('error',{err:e.message})
    }
})

//search 
router.post("/search",async(req,res)=>{
    try{
       let raj= req.body.searchTerm.trim()
    const searchProduct=await Product.find(
        {
        "$or":[
            {"name":{$regex:raj}},
            {"category":{$regex:raj}},
            {"company":{$regex:raj}}
        ]
        }
)
    res.render('search',{searchProduct})
    }
 
    catch(e){
        console.log(e);
    }
})




module.exports=router;