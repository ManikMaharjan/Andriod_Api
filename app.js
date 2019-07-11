
const express=require('express')
const app= express();
const cors = require('cors');
app.use(cors());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With","Authorization");
    next();
 });
 
const bodyParser=require('body-parser')
const mongoose=require('mongoose');

 
const UserController = require('./Controller/User');
const MoneyController = require('./Controller/Money')


mongoose.connect('mongodb://127.0.0.1:27017/Grouptracking',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
app.use(bodyParser.urlencoded({extended:true}))


app.use('/api/user',UserController);
app.use('/api/money',MoneyController);


app.listen(3000, () => console.log('server is running'));