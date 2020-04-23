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

router.post('/deleteSuggest',function(req,res){
  const { memberID } = req.body;

  let sql = `DELETE FROM suggestSql WHERE memberID = "${memberID}"`;
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[UPDATE ERROR] - ',err.message);
      res.json(result);
      return;
    }  
    res.json(result);
  });
})   


module.exports = router;
