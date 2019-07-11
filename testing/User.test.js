  
const UserModel = require('../Model/User');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Testing';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

describe('Group Expenses tracking testing', () => {
   var id='';
   // adding register
   it('Tracking testing', () => {
      const user = {
        'fullname': 'Manish',
        'email': 'm@gmail.com'
      };

      return UserModel.create(user)
         .then((user_res) => {
            id=user_res._id;
            expect(user_res.fullname).toEqual('Manish');
         });
   });

   //update user
   it('updateuser testing', () => {
     
      const userup = {
         
         fullname: 'Manishb'
      }
      console.log(id)
      return UserModel.findByIdAndUpdate(id,userup,{ new: true })
         .then((userupd) => {
            expect(userupd.fullname).toEqual('Manishb');
         });
   });

    //user delete testing
    //   it('testing user delete', async () => {
    //      const status = await User.deleteMany({usertype:'User'});
    //      expect(status.ok).toBe(1);
    //   });
    
   });

      







