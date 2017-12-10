'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    _id : String,
    pwd : String,
    note_id : [{type : Schema.ObjectId, ref : 'Note'}],

    timestamps:{
        createdAt : Date,
        updateAt : Date
    },
    // deleted : {type:Boolean, default:false, index:true}
});

module.exports = mongoose.model('Account', AccountSchema);

