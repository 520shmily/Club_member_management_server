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
  // 查找数据
  const sql = 'SELECT * FROM MyActivity WHERE activityID = ' + req.query.activityID; 
  // 插入数据
  var  addSql = 'INSERT INTO MyActivity(memberID,clubID,activityID,clubActivity,isSignUp,signIn,signOff,memberName) VALUES(?,?,?,?,?,?,?,?)';
  var  addSqlParams = [req.query.memberID,req.query.clubID,req.query.activityID,req.query.clubActivity,req.query.isSignUp,'false','false',req.query.memberName];
  // 更新数据
  var updateSql = '';
  var updateSqlParams = [];
  let isSignUp = '';

  //更新报名状态
  if(req.query.isSignUp) {
    updateSql = 'UPDATE MyActivity SET isSignUp = ? WHERE activityID = ' + req.query.activityID;
    updateSqlParams = [req.query.isSignUp];
    isSignUp = req.query.isSignUp;
  }
  //更新签到状态
  if(req.query.signIn) {
    updateSql = 'UPDATE MyActivity SET signIn = ? WHERE activityID = ' + req.query.activityID;
    updateSqlParams = [req.query.signIn];
    isSignUp = req.query.signIn;
  }
  //更新签退状态
  if(req.query.signOff) {
    updateSql = 'UPDATE MyActivity SET signOff = ? WHERE activityID = ' + req.query.activityID;
    updateSqlParams = [req.query.signOff];
    isSignUp = req.query.signOff;
  }
  //更新评论状态
  if(req.query.activitythinks) {
    updateSql = 'UPDATE MyActivity SET activitythinks = ? WHERE activityID = ' + req.query.activityID;
    updateSqlParams = [req.query.activitythinks];
  }

  let data = {}

  connection.query(sql,function(err,result){
    if(err){
        console.log('[SELECT ERROR] - ', err.message);
        res.json(result); 
        return;
    }
    if (result.length === 0) {
      // 没找到数据直接插入新数据
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
    } else {
      // 找到数据更新数据
      connection.query(updateSql,updateSqlParams,function (err, result) {
        if(err){
              console.log('[UPDATE ERROR] - ',err.message);
              return;
        }  
        if (isSignUp === 'true') {
          data = {
            code: 1,
          }
        } else {
          data = {
            code: 0,
          }
        }
        res.json(data);     
     });
    }
  }); 
})   

module.exports = router;
