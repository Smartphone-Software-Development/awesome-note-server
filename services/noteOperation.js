'use strict'
//const promise = query.exec();
const co = require('co');
const Note = require('../db_module/note');
const Account = require('../db_module/account');

exports.upload = co.wrap(function*(user_id, pwd, note) {
    let exist = yield Account.findOne({_id:user_id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let newNote = yield Note.create(note);
    let result1 = yield Note.update({_id:newNote._id}, {$set:{user_id : user_id}});
    let result2 = yield Account.update({_id:user_id}, {$push:{note_id:newNote._id}});
    yield Note.update({_id:newNote._id}, {$set:{timestamps:{createdAt:Date()}}});
    yield Account.update({_id:user_id}, {$set:{timestamps:{updateAt:Date()}}});

    if(newNote&&result1&&result2) {
        return 1;
    }
    return 0;
});

exports.update = co.wrap(function*(user_id, pwd, note) {
    let exist = yield Account.findOne({_id:user_id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let newNote = yield Note.findOne({user_id:user_id, id:note.id, deleted:false});
    let updateResult = yield Note.update({_id:newNote._id}, {$set:{title:note.title, content:note.content}});

    yield Note.update({_id:newNote._id}, {$set:{timestamps:{createdAt:Date()}}});
    yield Account.update({_id:user_id}, {$set:{timestamps:{updateAt:Date()}}});

    if(newNote&&updateResult) {
        return 1;
    }
    return 0;
});

exports.getAll = co.wrap(function*(user_id, pwd, limitation) {
    let exist = yield Account.findOne({_id:user_id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let noteSet = yield Note.find({user_id:user_id, deleted:false});
    noteSet = noteSet.reverse().slice(0, limitation);
    return noteSet;    
});

exports.get = co.wrap(function*(user_id, pwd, note_id) {
    let exist = yield Account.findOne({_id:user_id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let note = yield Note.findOne({user_id:user_id, id:note_id, deleted:false});
    return note;
});

exports.delete = co.wrap(function*(user_id, pwd, note_id) {
    let exist = yield Account.findOne({_id:user_id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let note = yield Note.findOne({user_id:user_id, id:note_id, deleted:false});
    let deleteResult = yield Note.update({_id:note._id}, {$set:{deleted:true}}); 

    if(note&&deleteResult) {
        return 1;
    }
});