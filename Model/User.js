const mongoose=require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema =mongoose.Schema({
    image: String,
    fullname:String,
    username:String,
    email:String,
    password:String,
    address:String,
    phone_number:String
})

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(9));
}
UserSchema.methods.validPassword =function(password){
    return bcrypt.compareSync(password, this.password);
}

const UserModel = mongoose.model('user',UserSchema);
/**
 * es5
 */
module.exports = UserModel;
/**
 * export UserModel variable from this file
 */