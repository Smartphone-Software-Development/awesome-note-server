'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    id : Number,
    title : String,
    content : String,
    user_id : {type:String, ref:'Account'},

    deleted : {type:Boolean, default:false, index:true},

    timestamps:{
        createdAt : Date,
        updateAt : Date
    }
});

module.exports=mongoose.model('Note', NoteSchema);

// //单个note

// {
//     "id" : 123,                         //数字类型不用用双引号括起来
//     "title" : "hey",
//     "content" : "hello world"
// }



// //多个note
// {
// "note" : [
//     {
//         "id" : 123,
//         "title" : "hey",
//         "content" : "hello world"
//     },
//     {
//         "id" : 123,
//         "title" : "hey",
//         "content" : "hello world"
//     }
// ]
// }