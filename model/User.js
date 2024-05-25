
const mongoose=require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');



const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  });
  

const userSchema=mongoose.Schema({
//user -PLm (passport-local-mongosh)
//password

email:{
    type:String,
    trim:true,
    required:true,

},
role:{
type:String,
default:'buyer'
},
gender:{
    type:String,
    trim:true,
    required:true,
},
whishlist:[
    {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Product"
    }
],
cart:[
    {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Product"
    }
],
reviews:[
    {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Review"
    }
],
quantity:
    {
        type:Number,
        default:1,
    }

})

userSchema.plugin(passportLocalMongoose);

let User=mongoose.model('User',userSchema)
module.exports=User;