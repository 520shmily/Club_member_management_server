var express = require('express');
var router = express.Router();
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'root',       
  port: '3306',                   
  database: 'clubDatabase',
  timezone: "08:00" 
}); 
 
connection.connect(function (err) {
  if (err) console.log('与MySQL数据库建立连接失败。');
  else {
    console.log('与MySQL数据库建立连接成功。');
  }
});

router.get('/',function(req,res){
  // 插入数据
  var  addSql = 'INSERT INTO suggestSql(memberID,memberName,suggest,clubID) VALUES(?,?,?,?)';
  var  addSqlParams = [req.query.memberID,req.query.memberName,req.query.suggest, req.query.clubID];
 
  connection.query(addSql,addSqlParams,function(err,result){
    if(err){
        console.log('[SELECT ERROR] - ', err.message);
        res.json(result); 
        return;
    }
    data = {
      code: 1,
    }
    res.json(data); 
  }); 
})   

module.exports = router;
