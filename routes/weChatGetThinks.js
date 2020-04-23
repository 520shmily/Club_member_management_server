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
  let sql = 'SELECT * FROM MyActivity WHERE activityID = ' + req.query.activityID;

  let data = {}
  connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
      if (result.length === 0) {
        data = {
          code: 0,
          data: result
        }
      } else {
        data = {
          code: 1,
          data: result
        }
      }
      res.json(data); 
  }); 
})   

module.exports = router;
