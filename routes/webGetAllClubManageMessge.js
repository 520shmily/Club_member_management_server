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

router.post('/getAllClubManageMessge',function(req,res){
  const { option, systemID, systemPW, systemName, id, row } = req.body;
  let sql = ''

  if (option == 'check') {
    sql = 'SELECT * FROM systemSQL';
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
  
      res.send({
        allClubManageMessge: result
      });
    })
    return;
  } 

  if (option == 'add') {
    sql = `SELECT * FROM systemSQL WHERE systemID = "${systemID}"`;
    var  addSql = 'INSERT INTO systemSQL(systemID,systemPW,systemName,id) VALUES(?,?,?,?)';
    var  addSqlParams = [systemID,systemPW,systemName,id];
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
    let updateSql = 'UPDATE systemSQL SET systemPW = ?,systemName = ? WHERE systemID = ?';
    let updateSqlParams = [ row.systemPW, row.systemName, row.systemID];

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
    sql = `DELETE FROM systemSQL WHERE systemID = "${systemID}"`;
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
