'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    id : Number,
    title : String,
    content : String,
    latitude : Number,
    longitude : Number,
    user_id : {type:String, ref:'Account'},

    deleted : {type:Boolean, default:false, index:true},

    timestamps:{
        createdAt : Date,
        updateAt : Date
    }
});

module.exports=mongoose.model('Note', NoteSchema);