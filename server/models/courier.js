const mongoose=require('mongoose')

const Schema=mongoose.Schema
const courierSchema=new Schema({
    rname:{
        type: String,
        required: true
      },
      yemail:{
        type: String,
        required: true
      },
    remail:{
        type: String,
        required: true
      },
      rweight:{
        type: Number,
        required: true
      },
    
      rstate:{
        type: String,
        required: true
      },
      rdistrict:{
        type: String,
        required: true
      },
      rcheck:{
        type:Number,
        default:1
      },
      rprice:{
        type:Number,
        default:5000
      }
      


    
})
module.exports=mongoose.model('sendCourier',courierSchema,'sendCouriers');
