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

router.post('/getImgPhotos',function(req,res){
  const { option, clubID, uid, imageId } = req.body;

  let sql = ''
  if (option == 'check') {
    sql = `SELECT * FROM imageSql WHERE clubID = "${clubID}"`;
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }

      let resultData = result.map((item,index) => {
        return {uid: item.uid , url: item.imageId}
      })
  
      res.send({
        clubphotos: resultData
      });
    })
    return;
  } 

  if (option == 'add') {
    var values = imageId.map((item) => {
      return [clubID, item.url, item.uid ]
    })
    var addSql = "INSERT INTO imageSql (clubID,imageId,uid) VALUES ?";

    connection.query(addSql,[values],function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }
    }); 
    res.json(result);
    return;
  }

  if (option == 'delete') {
    sql = `DELETE FROM imageSql WHERE clubID = "${clubID}" && uid = "${uid}"`;
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

  if (option == 'update') {
    var values = imageId.map((item) => {
      return [clubID, item.url, item.uid ]
    })
    var addSql = "INSERT INTO imageSql (clubID,imageId,uid) VALUES ?";

    connection.query(addSql,[values],function(err,result){
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

module.exports = router;
