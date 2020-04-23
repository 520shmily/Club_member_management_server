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

router.post('/getClubMember',function(req,res){
  const { option, systemID, memberID, memberName, memberClassID, manage, 
    classYear, college, qq, wechat, phoneNumber, level, memberPW } = req.body;

  let sql = ''
  if (option == 'check') {
    sql = `SELECT * FROM memberSQL WHERE clubID = "${systemID}"`;
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
  
      res.send({
        allClubMember: result
      });
    })
    return;
  } 

  if (option == 'add') {
    sql = `SELECT * FROM memberSQL WHERE memberID = "${memberID}"`;
    var  addSql = 'INSERT INTO memberSQL(memberID,clubID,memberName,memberClassID,manage,classYear,college,qq,wechat,phoneNumber,memberPW) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    var  addSqlParams = [memberID,systemID,memberName,memberClassID,manage,classYear,college,qq,wechat,phoneNumber,memberClassID];
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
      if (result.length == 0) {
        connection.query(addSql,addSqlParams,function(err,result){
          if(err){
              console.log('[SELECT ERROR] - ', err.message);
              res.json(result); 
              return;
          }
        }); 
        res.json(result);
        return;
      }
    })
    return;
  }


  if (option == 'update') {
    let memberPW = memberClassID;
    let updateSql = 'UPDATE memberSQL SET clubID = ?,memberName = ?, memberClassID = ?, manage = ? , classYear = ?, college = ?, qq = ?, wechat = ?, phoneNumber = ?, memberPW = ? WHERE memberID = ?';
    let updateSqlParams = [systemID,memberName,memberClassID,manage,classYear,college,qq,wechat,phoneNumber,memberPW,memberID];

    connection.query(updateSql,updateSqlParams,function (err, result) {
      if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        res.json(result);
        return;
      }  
      res.json(result);
   });
   return;
  }

  if (option == 'assess') {
    let updateSql = 'UPDATE memberSQL SET level = ? WHERE memberID = ?';
    let updateSqlParams = [level, memberID];

    connection.query(updateSql,updateSqlParams,function (err, result) {
      if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        res.json(result);
        return;
      }  
      res.json(result);
   });
   return;
  }

  if (option == 'resetPassWord') {
    let updateSql = 'UPDATE memberSQL SET memberPW = ? WHERE memberID = ?';
    let updateSqlParams = [memberPW, memberID];

    connection.query(updateSql,updateSqlParams,function (err, result) {
      if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        res.json(result);
        return;
      }  
      res.json(result);
   });
   return;
  }

  if (option == 'delete') {
    sql = `DELETE FROM memberSQL WHERE memberID = "${memberID}"`;
    connection.query(sql,function (err, result) {
      if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        res.json(result);
        return;
      }  
      res.json(result);
   });
   return;
  }
})   

module.exports = router;
