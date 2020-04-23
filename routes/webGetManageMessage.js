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

router.post('/getManageMessage',function(req,res){
  const { option, systemID, systemPW } = req.body;

  if (option == 'check') {
    let sql = `SELECT * FROM systemSQL WHERE systemID = "${systemID}"`;
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
  
      res.send({
        clubManageMessge: result
      });
    })
    return;
  } 

  if (option == 'update') {
    let updateSql = 'UPDATE systemSQL SET systemPW = ? WHERE systemID = ?';
    let updateSqlParams = [ systemPW, systemID];

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
})   

module.exports = router;
