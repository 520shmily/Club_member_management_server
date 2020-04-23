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

router.post('/getMemberJoinActivity',function(req,res){
  const { option, activityID, memberID } = req.body;

  let sql = ''
  if (option == 'assess') {
    sql = `SELECT * FROM MyActivity WHERE memberID = "${memberID}"`;
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
  
      res.send({
        MemberJoinActivityData: result
      });
    })
    return;
  } 

  if (option == 'checkMember') { 
    sql = `SELECT * FROM MyActivity WHERE activityID = "${activityID}"`;
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
  
      res.send({
        saveCheckMemberJoinActivity: result
      });
    })
    return;
  }
})   

module.exports = router;
