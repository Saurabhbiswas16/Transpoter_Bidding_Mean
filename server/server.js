
const express=require('express')
const bodyParser = require('body-parser')
const cors=require('cors')

const PORT=3000

const api=require('./routes/api')



const app=express()
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/api',api)


app.get('/',function(req,res){
    res.send("hello server")
})

app.listen(PORT,function(req,res){
    console.log('Server running on localost: '+PORT)
})