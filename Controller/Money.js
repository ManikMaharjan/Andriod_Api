const express = require('express');
const router = express.Router();
const MoneyModel =require('../Model/Money');
const verifyToken = require('../Middleware/verfiyToken');
const UserModel = require('../Model/User')


router.post('/' ,function(req,res){
    var transaction=req.body;
    UserModel.find({email: transaction.email},function(err,result){
        if(err) res.status(500).send('Opps')
        if(result.length == 0){
            res.status(500).send('Person not found, Please check email.')
        }else{

            transaction.taker_user_id = result[0]._id;
            let MoneyObj= new MoneyModel(transaction);
            MoneyObj.save();
            res.json(MoneyObj)
        
        }

    })    
    
});
router.get ('/',function(req ,res){
    MoneyModel.find({},function(err,loan){
        if(err){
            res.status(500).send('oops there is something worng')
        }else{
            res.send(loan)
        }
    });
});


router.delete('/:id',verifyToken,function(req,res){
    MoneyModel.findByIdAndDelete(req.params.id).then(function(err,result){
        if(err){
           res.status(500).send('oops')
        }
      else{
        res.json(result);
      }
    })
})
router.put('/:id',verifyToken,function(req ,res){
    uid =req.params.id.toString();
    MoneyModel.findByIdAndUpdate(uid,req.body,{ new :true}, (err,uid)=>{
        if (err) { 
            res.status.send(' udpate error');
        } else{
            res.send(uid);
        }
    })
})
 
 router.get('/creator/:createid',(req,res)=>{
     let reqCreateid=req.params.createid;

     MoneyModel.find({create_user_id:reqCreateid}).populate('create_user_id').populate('taker_user_id').exec((err,lend_added)=>{
         if(err){
             res.send(500).send('oops');

         }
         res.json(lend_added);
     })
 })
 router.get('/taker/:takerid',(req,res)=>{
     let reqtakerid=req.params.takerid;

     MoneyModel.find({taker_user_id:reqtakerid}).populate('create_user_id').populate('taker_user_id').exec(function(err,result) {
      
        if (err){
            console.log(err);
             res.status(500).send(err);
         }
         res.json(result);

     })
    //  MoneyModel.find({taker_user_id:reqtakerid},(err,giver)=>{
    //  })
 });

 router.post('/transction-total',verifyToken,(req,res) =>{
     MoneyModel.find(req.body,function(err,result){
        if(err) res.status(500).send('Opps');
        res.send(result);
     })
 })
 
module.exports=router;