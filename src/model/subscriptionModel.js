const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({

    user_name:{type:String},
    plan_id:{type:String},
    start_date:{type:String},
    valid_till:{type:String}

}, { timestamps: true });

module.exports = mongoose.model('subscriptionCollection',subscriptionSchema )