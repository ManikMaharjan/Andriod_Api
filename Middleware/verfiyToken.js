const jwt =require('jsonwebtoken');

function verifyToken(req, res ,next){
    const bearerHeader =req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined'){
       /// split convert space into array
       const bearer  =bearerHeader.split(' ');

       /// get token from array
       const bearerToken = bearer[1];
       
       //set the token
       req.token = bearerToken;
       jwt.verify(req.token,'secretkey',function(err,decode){
           if(err) res.status(500).send('Invalid token');       
           next()
       })
       ///next middleware
    }else {
        res.status(500).send('Token not provided');
    }

}

module.exports  = verifyToken;