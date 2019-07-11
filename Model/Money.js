const mongoose = require('mongoose');

const MoneySchema =mongoose.Schema({
    amount: String,
    date :{ type: Date, default: Date.now },
    create_user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    taker_user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    conformation: { type: Boolean, default: false },
    is_transaction_complete :{ type: Boolean, default: false },
})
const MoneyModel =mongoose.model('money', MoneySchema);
module.exports=MoneyModel;