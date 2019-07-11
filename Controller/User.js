const express = require('express');
const router = express.Router();
const multer =require('multer');
const path = require('path');
const fs= require("fs");
const UserModel = require('../Model/User')

const jwt =require('jsonwebtoken');
const verifyToken = require('../Middleware/verfiyToken');


router.post('/',function(req, res){
    console.log("dbconnected")
    /** 
     * NOTE : First check duplicate email, then add to databse 
     */
    var user = req.body; // Frontend data's
    console.log(user);
        
    UserModel.find({email: user.email}, function(err,result){
        if(err){
            res.status(500).send('Something went worng.')
        }
        if(result.length == 0){
            let userobj = new UserModel(user); // New object() then populate that frontend data in userobj.
            userobj.password = userobj.generateHash(userobj.password); // encrypt password
            userobj.save(); // add to database
            res.json(userobj) // send response to frontend with userobj.
        }else{
            res.status(500).send('Email already exist.')
        }
    })
    
});


router.post('/login', async(req,res) =>{
    /**
     * 
     * NOTE : req.body is object sent by front , e.g in login {email:"", password:""};
     * 
     */

    let Reqemail = req.body.email;
    let pass = req.body.password;
    /**
     * 
     * NOTE : First verfiy if email is in database then check password
     * 
     */
    UserModel.findOne({email:Reqemail},function(err,result){
        
        if(err){
            console.log('error')
            res.status(500).send('Something went worng.');
        }
        console.log(result)

        if(result){
            let isValidate = result.validPassword(pass); //check front password with database and return true or false;
            if(isValidate){
                jwt.sign({id:result._id,email:result.email}, 'secretkey',(err , token)=> {
console.log(token);
                    res.json({
                        token:token,
                        userInfo:{
                            username:result.username,
                            fullname:result.fullname,
                            email:result.email,
                            address:result.address,
                            phone_number:result.phone_number,
                            _id:result._id
                        }
                    })
                })
            }else{
                res.status(500).send('inavlid username or password');
            }
        }else{
            res.status(500).send('inavlid username or password');
        }
    })
});


router.get('/',(req,res) =>{
    UserModel.find({},function(err,users){
if(err){
   res.status(500).send('oops there is something worng')
}else{
   res.send(users)
}

})

});
/**
 * delete 
 /
 sd
 * 
 * edit gara
 * 
 */
router.delete('/:id', verifyToken,function(req,res){
    UserModel.findByIdAndDelete(req.params.id).then(function(){
        console.log(req.params.id);
        res.send('user is deleted');
// console.log(req);
    })
})

router.put('/:id',verifyToken,function (req,res){
uid =req.params.id.toString();
console.log(uid);
console.log(req.body);
UserModel.findByIdAndUpdate(uid,req.body,{ new :true}, (err,result)=>{
     if (err) { res.send(' udpate error')
} else{
    res.send({
            username:result.username,
            fullname:result.fullname,
            email:result.email,
            address:result.address,
            phone_number:result.phone_number,
            id:result._id
        
    })

}
})
})


router.get('/:id',(req,res)=>{
    let ReqId=req.params.id;   
    console.log(ReqId) 
    UserModel.findOne({_id:ReqId},(err,info)=>{
        if(err){
            res.status(500).send('oops');
        }
            res.json(info);
        
    })
})
/**
  * imgapi
  */
 var storage = multer.diskStorage({
    destination: 'ProfilePicture',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'User' + Date.now() + ext);
    }
});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

router.post('/uploadImg/:userId',upload.single('image'), (req, res) => {
    let userId= req.params.userId;
    UserModel.findByIdAndUpdate(userId,{ image:req.file.filename },{ new :true}, (err,result)=>{
        if (err)  res.status(500).send(' udpate error')
        res.send(result)  
   });
});

module.exports = router;    
//moddule is export.
