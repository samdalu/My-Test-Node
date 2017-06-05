var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://aspirewms:mLab2017!@ds159220.mlab.com:59220/aspirewms', ['memberslist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/index"));
app.use(bodyParser.json());
app.get('/memberslist',function(req, res){
  console.log("I received a GET request");

  db.memberslist.find(function (err, docs){
    console.log(docs);
    res.json(docs);
  });
});
app.post('/memberslist', function(req,res){
  console.log(req.body);
  db.memberslist.insert(req.body,function(err,doc){
    res.json(doc);
  });
});
app.delete('/memberslist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.memberslist.remove({_id : mongojs.ObjectId(id)}, function( err,doc){
    res.json(doc);

  });
});
app.get('/memberslist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.memberslist.findOne({_id : mongojs.ObjectId(id)}, function( err,doc){
    res.json(doc);
  });
});
app.put('/memberslist/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.name);
  db.memberslist.findAndModify({
    query: {_id : mongojs.ObjectId(id)}, update: {$set:{name:req.body.name,team:req.body.team,yoe:req.body.yoe}},
    new:true},function(err,doc){
      res.json(doc);
    });
});
app.listen(process.env.PORT || 5000);
console.log("Server running on port 3000");
