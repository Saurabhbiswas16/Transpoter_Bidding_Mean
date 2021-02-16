
const express=require('express');
const jwt=require('jsonwebtoken');
const router =express.Router();
const User=require("../models/user")
const Courier=require("../models/courier")

const mongoose=require('mongoose');
const courier = require('../models/courier');

const db= "mongodb://localhost:27017/Transporter-bidding";

mongoose.connect(db,err=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("Database connected")
    }
    
})

function verifyToken(req, res, next)
{
    if(!req.headers.authorization)
    {
        return res.status(401).send("Unauthorized User")
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null')
    {
        return res.status(401).send("Unauthorized User")
    }
    let payload=jwt.verify(token,'secretKey')
    if(!payload)
    {
        return res.status(401).send("Unauthorized User")
    }
    req.userId=payload.subject
    next()
}
router.get('/',(req,res)=>{
    res.send("from api");
})


router.post('/register',(req,res)=>{
    let userData=req.body;
    let user=new User(userData)
   
    user.save((error,registeredUser)=>{
        if(error)
        {
            console.log(error);
        }
        else{
           let  payload ={ subject: registeredUser._id}
            var token = jwt.sign(payload,'secretKey')
            let bidderemail=req.body.email

            res.status(200).json({ token: token ,bidderemail:bidderemail})
        }
    })
})

router.post('/login',(req,res)=>{
    let userData=req.body;
    User.findOne({email:userData.email},(error,user)=>{
        if(error)
        {
            console.log(error);
        }
        else{
            if(!user)
            {
                res.json({loginerror:'Email or Password is in correct'})
            }
            else if(user.password!=userData.password)
            {
                res.json({loginerror:'Email or Password is in correct'})
            }
            else{
                let  payload={ subject: user._id}
                var token = jwt.sign(payload,'secretKey')
                let bidderemail=req.body.email
                res.status(200).json({ token: token ,bidderemail:bidderemail})
            }
        }
    })
})

router.post('/courier',(req,res)=>{
    let courierData=req.body;
    let courier=new Courier(courierData)
   
    courier.save((error,registeredUser)=>{
        if(error)
        {
            console.log(error);
            res.status(400).send("error")
        }
        else
        {
            res.json({addedcourier:"Successfully"})
        }
    })
})
router.get('/getallcourier', (req, res, next) => {
    courier.find({ rcheck: 1}, (err, allcourie) => {
        if (err) {
            res.status(500).json({ errmsg: err })
        }
        res.status(200).json({ allcouries: allcourie })
    })
})

router.get("/updatecourier", (req, res, next) => {
    Courier.findOne({ _id: req.query.id }, (err, allcourie) => {
        console.log("hello")
        if (err) {
            res.json({ errmsg: err })
        }
        
        if( parseInt(req.query.price) >= allcourie.rprice )
        {
           
            res.json({ lesserr: "Bid less than the previous value" })
        }
        else{
            Courier.updateOne({ _id: req.query.id }, {
        
                rprice: req.query.price
            }, function (err, courier) {
                
                if (err) {
                    console.log(err)
                    res.json({ errmsg: err })
                }
                else {
                   
                    return res.status(201).json({couriers:courier});
                }
            })
        }
    })
    
})
router.get("/updatecheck", (req, res, next) => {
    Courier.updateOne({ _id: req.query.id }, {
        
        rcheck:0
    }, function (err, courier) {
        console.log(1);
        if (err) {
            console.log(err)
            res.status(500).json({ errmsg: err })
        }
        else {
            
            return res.status(201).json({couriers:courier});
        }
    })
})
module.exports=router