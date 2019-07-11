
const MoneyModel = require('../Model/Money');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/MoneyModelTesting';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

describe('Group Expenses Money testing', () => {
   var id='';
   // adding register
   it('Tracking testing', () => {
      const money = {
        'amount': '500',
        'email': 'm@gmail.com'
      };

      return MoneyModel.create(money)
         .then((money_res) => {
            id=money_res._id;
            expect(money_res.amount).toEqual('500');
         });
   });
   
});

