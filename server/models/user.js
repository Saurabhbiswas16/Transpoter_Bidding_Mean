const mongoose=require('mongoose')

const Schema=mongoose.Schema
const userSchema=new Schema({
    name:{
        type: String,
        required: true
      },
    email:{
        type: String,
        required: true
      },
    password:{
        type: String,
        required: true
      },
      state:{
        type: String,
        required: true
      },
      district:{
        type: String,
        required: true
      },


    
})
module.exports=mongoose.model('user',userSchema,'users');
