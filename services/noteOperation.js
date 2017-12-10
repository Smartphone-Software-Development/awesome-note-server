'use strict'
const co = require('co');
const Note = require('../db_module/note');
const Account = require('../db_module/account');

exports.upload = co.wrap(function*(user_Id, pwd, Obj) {
    let exist = yield Account.findOne({_id:user_Id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let note = yield Note.create(obj);
    let result1 = yield Note.update({_id:note._id}, {$set:{user_Id : user_Id}});
    let result2 = yield Account.update({_id:user_Id}, {$push:{note_id:note._id}});
    yield Note.update({_id:note._id}, {$set:{timestamps:{createAt:Date().getTime()}}});
    yield Account.update({_id:user_Id}, {$set:{timestamps:{updateAt:Date().getTime()}}});

    if(note&&result1&&result2) {
        return 1;
    }
    return 0;
});

exports.update = co.wrap(function*(user_Id, pwd, Obj) {
    let exist = yield Account.findOne({_id:user_Id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let note = yield Note.findOne({user_Id:user_Id, id:obj.id, deleted:false});
    let updateResult = yield Note.update({_id:note._id}, {$set:{title:Obj.title, content:Obj.content}});

    yield Note.update({_id:note._id}, {$set:{timestamps:{createAt:Date().getTime()}}});
    yield Account.update({_id:user_Id}, {$set:{timestamps:{updateAt:Date().getTime()}}});

    if(note&&updateResult) {
        return 1;
    }
    return 0;
});

exports.getAll = co.wrap(function*(user_Id, pwd, limitation) {
    let exist = yield Account.findOne({_id:user_Id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let noteSet = yield Note.find({user_Id:user_Id, deleted:false}).reverse().limite(limitation);
    return noteSet;    
});

exports.get = co.wrap(function*(user_Id, pwd, note_id) {
    let exist = yield Account.findOne({_id:user_Id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let note = yield Note.findOne({user_Id:user_Id, id:note_id, deleted:false});
    return note;
});

exports.delete = co.wrap(function*(user_Id, pwd, note_id) {
    let exist = yield Account.findOne({_id:user_Id, pwd:pwd});
    if(!exist) {
        return -1;
    }
    let note = yield Note.findOne({user_Id:user_Id, id:note_id, deleted:false});
    let deleteResult = yield Note.update({_id:note._id}, {$set:{deleteResult:true}}); 

    if(note&&deleteResult) {
        return 1;
    }
});