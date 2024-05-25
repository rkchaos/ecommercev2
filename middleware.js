const Product = require('./model/Products');
const{prodeucSchema,reviewSchema}=require('./schema')


const validProduct=(req,res,next)=>{
    let{name,img,price,desc}=req.body;
    const { error } = prodeucSchema.validate({ name,img,price,desc });
if(error){
    const msg=error.details.map((err)=>err.message).join(",")
        return res.render('error',{err:msg})
}
next();
}
const validReview=(req,res,next)=>{
      let{rating,comment}=req.body;
    const { error } = reviewSchema.validate({ rating,comment});
if(error){
    const msg=error.details.map((err)=>err.message).join(",")
    return res.render('error',{err:msg})
}
next();
}
// const login=(req,res,next)=>{
//     if(req.xhr && !req.isAuthenticated()){
//         // req.xhr ajax hai ya nhi hai?
//         return res.status(401).send("unauthorised")
//     }

//         // console.log(req.xhr)//ajax hai ya nhi
//     if(!req.isAuthenticated()){
// req.flash('error',"You have to login first")
// return res.redirect('/login')
//     }
//     next();
// }
const login = (req,res,next)=>{

    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).send('unauthorised');
        // console.log(req.xhr);//ajax hai ya nhi hai?
    }

    if(!req.isAuthenticated()){
        req.flash('error' , 'You need to login first');
        return res.redirect('/login')
    }
    next();
}
const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error',"You donot have permissions")
return res.redirect('/products')
    }
    else if(req.user.role!=='seller'){
        req.flash('error',"You donot have permissions")
        return res.redirect('/products')
    }
    next();
}
const isProductAuthor= async(req,res,next)=>{
let {id}=req.params
let product=await Product.findById(id);
if(!product.author.equals(req.user._id)){
    req.flash('error',"You are not a owner")
    return res.redirect('/products')
}
next();
}

module.exports={validProduct,validReview,login,isSeller,isProductAuthor};