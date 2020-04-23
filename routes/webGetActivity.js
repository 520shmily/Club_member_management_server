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

router.post('/getActivity',function(req,res){
  const { option, clubID, activityImg, activityIntroduce, activityRequire, activitySite, 
    activityStopTime, activityTime, clubActivity, activityID } = req.body;

  let sql = ''
  if (option == 'check') {
    sql = `SELECT * FROM clubActivitySQL WHERE clubID = "${clubID}"`;
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
  
      res.send({
        allActivity: result
      });
    })
    return;
  } 

  if (option == 'add') {
    sql = 'SELECT * FROM clubActivitySQL';
   connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }

      var activityID = (result.length + 1);
      var  addSql = 'INSERT INTO clubActivitySQL(activityID,clubID, activityImg, activityIntroduce, activityRequire, activitySite, activityStopTime, activityTime, clubActivity) VALUES(?,?,?,?,?,?,?,?,?)';
      var  addSqlParams = [activityID,clubID, activityImg.fileList[0].thumbUrl, activityIntroduce, activityRequire, activitySite, activityStopTime, activityTime, clubActivity];
      
      connection.query(addSql,addSqlParams,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            res.json(result); 
            return;
        }
      }); 
      res.json(result);
      return;
    })
    return;
  }

  
  if (option == 'update') {
    let updateSql = 'UPDATE clubActivitySQL SET clubActivity = ?,activitySite = ?,activityTime = ?,activityStopTime = ?,activityIntroduce = ?,activityRequire = ?, activityImg = ? WHERE activityID = ?';
    let updateSqlParams = [clubActivity ,activitySite ,activityTime ,activityStopTime ,activityIntroduce ,activityRequire , activityImg, activityID];

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
    sql = `DELETE FROM clubActivitySQL WHERE activityID = "${activityID}"`;
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
