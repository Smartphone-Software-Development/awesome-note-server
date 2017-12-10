'use strict'

const express = require('express');
const app = express();
app.set('port', process.env.PORT || 2333);

const Services = require('./services/noteOperation') ;

app.post('/mine/uploadNote', function(req, res){
    let note = req.body.note;
    let obj = JSON.parse(note);
    let user_id = req.body.user_id;
    let pwd = req.body.pwd;
    Services.upload(user_id, pwd, note).then(function(result) {
    //Services.NoteOperation.upload(user_id, pwd, note).then(function(result) {
        if(result == -1) {
            res.type('text/plain');
            res.send('数据库账号密码错误，请重新登入');
        }else if(result == 0) {
            res.type('text/plain');
            res.send('创建失败');
        }else{
            res.type('text/plain');
            res.send('创建成功');
        }
    });
});

app.post('/mine/updateNote', function(req, res) {
    let note = req.body.note;
    let obj = JSON.parse(note);
    let user_id = req.body.user_id;
    let pwd = req.body.pwd;
    Services.update(user_id, pwd, note).then(function(result) {
    //Services.NoteOperation.update(user_id, pwd, note).then(function(result) {
        if(result == -1) {
            res.type('text/plain');
            res.send('数据库账号密码错误，请重新登入');
        }else if(result == 0) {
            res.type('text/plain');
            res.send('更新失败');
        }else{
            res.type('text/plain');
            res.send('更新成功');
        }
    });
});

app.post('/mine/updateNote', function(req, res) {
    let note = req.body.note;
    let obj = JSON.parse(note);
    let user_id = req.body.user_id;
    let pwd = req.body.pwd;
    Services.update(user_id, pwd, note).then(function(result) {
    //Services.NoteOperation.update(user_id, pwd, note).then(function(result) {
        if(result == -1) {
            res.type('text/plain');
            res.send('数据库账号密码错误，请重新登入');
        }else if(result == 0) {
            res.type('text/plain');
            res.send('更新失败');
        }else{
            res.type('text/plain');
            res.send('更新成功');
        }
    });
});

app.post('/mine/getAllNote', function(req, res) {
    let user_id = req.body.user_id;
    let pwd = req.body.pwd;
    let limitation = req.body.limitation;
    Services.getAll(user_id, pwd, limitation).then(function(result) {
    //Services.NoteOperation.getAll(user_id, pwd, limitation).then(function(result) {
        if(result == -1) {
            res.type('text/plain');
            res.send('数据库账号密码错误，请重新登入');
        }else{
            res.json(result);
        }
    });
});

app.post('/mine/getNote', function(req, res) {
    let user_id = req.body.user_id;
    let pwd = req.body.pwd;
    let limitation = req.body.note_id;
    Services.getAll(user_Id, pwd, limitation).then(function(result) {
    //Services.NoteOperation.getAll(user_Id, pwd, limitation).then(function(result) {
        if(result == -1) {
            res.type('text/plain');
            res.send('数据库账号密码错误，请重新登入');
        }else{
            res.json(result);
        }
    });
});

app.post('/mine/deleteNote', function(req, res) {
    let user_id = req.body.user_id;
    let pwd = req.body.pwd;
    let note_Id = req.body.note_id;
    //Services.NoteOperation.getAll(user_Id, pwd, limitation).then(function(result) {
    Services.getAll(user_Id, pwd, limitation).then(function(result) {
        if(result == -1) {
            res.type('text/plain');
            res.send('数据库账号密码错误，请重新登入');
        }else{
            res.type('text/plain');
            res.send('删除成功');
        }
    });
});


// 404
app.use(function(req, res){
res.type('text/plain');
res.status(404);
res.send('404 - Not Found');
});

// 500
app.use(function(err, req, res, next){
console.error(err.stack);
res.type('text/plain');
res.status(500);
res.send('500 - Server Error');
});

//监听端口
app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});