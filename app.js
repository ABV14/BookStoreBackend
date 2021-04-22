const express=require('express')
const app=express()
const api=require('./api')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cors=require('cors')
app.set('port',(process.env.PORT||4000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use("/api",api)
app.use(express.static('static'))
app.use(morgan('dev'))
app.use((req,res)=>{
        const err=new Error('Not Found')
        err.status=404;
        res.json(err)
})
const database=require('mongoose')
database.connect('mongodb+srv://ABV:ABV@cluster0.ds65o.mongodb.net/BookStore?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true })
const db=database.connection
db.on('error',console.error.bind(console,'connection error'))
db.once('open',()=>{
    console.log('connected to Database')
    app.listen(app.get('port'),function(){
        console.log('API server is running at' +app.get('port')+ '!!')
    })
})