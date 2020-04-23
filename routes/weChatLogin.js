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
  let sql = '';
  if(req.query.username && req.query.password) {
    sql = 'SELECT * FROM memberSQL WHERE memberID = ' + req.query.username + '&& memberPW = ' + req.query.password;
  } else if (req.query.username) {
    sql = 'SELECT * FROM memberSQL WHERE memberID = ' + req.query.username;
  }
  // const sql = 'SELECT * FROM memberSQL WHERE memberID = ' + req.query.username + '&& memberPW = ' + req.query.password; 

  // 更新数据
  var updateSql = '';
  var updateSqlParams = [];

  //更新 专业信息
  if(req.query.manage) {
    updateSql = 'UPDATE memberSQL SET manage = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.manage];
  }

  //更新 年级
  if(req.query.classYear) {
    updateSql = 'UPDATE memberSQL SET classYear = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.classYear];
  }

  //更新 学院
  if(req.query.college) {
    updateSql = 'UPDATE memberSQL SET college = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.college];
  }

  //更新 QQ
  if(req.query.qq) {
    updateSql = 'UPDATE memberSQL SET qq = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.qq];
  }

  //更新 微信
  if(req.query.wechat) {
    updateSql = 'UPDATE memberSQL SET wechat = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.wechat];
  }

  //更新 电话
  if(req.query.phoneNumber) {
    updateSql = 'UPDATE memberSQL SET phoneNumber = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.phoneNumber];
  }

  //更新 密码
  if(req.query.memberPW) {
    updateSql = 'UPDATE memberSQL SET memberPW = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.memberPW];
  }

  //更新 建议
  if(req.query.suggest) {
    updateSql = 'UPDATE memberSQL SET suggest = ? WHERE memberID = ' + req.query.username;
    updateSqlParams = [req.query.suggest];
  }

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
      
        // 更新个人信息
        connection.query(updateSql,updateSqlParams,function (err, result) {
          if(err){
                console.log('[UPDATE ERROR] - ',err.message);
                return;
          }       
        });
      }
      res.json(data); 
  }); 
})   

module.exports = router;
