var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var q = require('q');
var bodyParser = require('body-parser');

var url = "mongodb://localhost:27017";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
    console.log("数据库连接成功");
    db.close();
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static("./static"));

// 查找所有todo list
app.get('/todo/list', function(req,res,next){
    MongoClient.connect(url, function(err, db) {
        var dblocal = db.db("local");
        dblocal.collection("todo").find({}).toArray(function(err, result) {
            if(err){
                res.status(500).json({
                    message: err,
                    code: 500,
                    success: false
                })
            }else{
                var count = 0;
                // 计算待办事件总数
                result.forEach(e => {
                    if(!e.completed){
                        count++;
                    }
                });
                res.status(200).json({
                    data: {
                        list: result,
                        count: count
                    },
                    code: 200,
                    success: true
                })
            }
            db.close();
        });
    });
});

// 新增todo
app.post('/todo/add', function(req,res,next){
    var temp = req.body;
    temp.completed = temp.completed==='false' ? false : true; 
    temp.id = new Date().getTime();
    MongoClient.connect(url, function(err, db) {
        var dblocal = db.db("local");
        dblocal.collection("todo").insertOne(temp, function(err, result) {
            if(err){
                res.status(500).json({
                    message: err,
                    code: 500,
                    success: false
                })
            }else{
                res.status(200).json({
                    data: result,
                    code: 200,
                    success: true
                })
            }
            db.close();
        });
    });
});

// 更新todo状态
app.post('/todo/update', function(req,res,next){
    var temp = req.body;
    temp.completed = temp.completed==='false' ? false : true; 
    temp.id = parseInt(temp.id);
    MongoClient.connect(url, function(err, db) {
        var dblocal = db.db("local");
        dblocal.collection("todo").updateOne({
            "id" : temp.id 
        }, {
            $set: { "completed": temp.completed },
        }, function(err, result) {
            if(err){
                res.status(500).json({
                    message: err,
                    code: 500,
                    success: false
                })
            }else{
                res.status(200).json({
                    data: result,
                    code: 200,
                    success: true
                })
            }
            db.close();
        });
    });
});

// 删除todo
app.delete('/todo/delete', function(req,res,next){
    var temp = req.body;
    temp.id = parseInt(temp.id);
    MongoClient.connect(url, function(err, db) {
        var dblocal = db.db("local");
        dblocal.collection("todo").deleteOne({
            "id" : temp.id 
        }, function(err, result) {
            if(err){
                res.status(500).json({
                    message: err,
                    code: 500,
                    success: false
                })
            }else{
                res.status(200).json({
                    data: result,
                    code: 200,
                    success: true
                })
            }
            db.close();
        });
    });
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});


