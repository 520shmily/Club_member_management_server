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

router.post('/getClubMessage',function(req,res){
  const { option, clubID, clubName, clubWordMessage, clubImg } = req.body;

  let sql = ''
  if (option == 'check') {
    sql = `SELECT * FROM clubSQL WHERE clubID = "${clubID}"`;
    connection.query(sql,function(err,result){
      if(err){
          console.log('[SELECT ERROR] - ', err.message);
          res.json(result); 
          return;
      }

      let photolist = [];
      if (result.length > 0) {
        if (result[0].clubPhotos) {
          photolist = [
            {
              uid: '0',
              url: result[0].clubImgMessage,
            },
            {
              uid: '1',
              url: result[0].clubPhotos,
            }
          ]
        } else  {
          photolist = [
            {
              uid: '0',
              url: result[0].clubImgMessage,
            }
          ]
        }  
      }
  
      res.send({
        clubmessage: {
          result,
          clubPhotos: photolist,
        }
      });
    })
    return;
  } 

  if (option == 'add') {
    let clubPhotos = clubImg.fileList.length > 1 ? clubImg.fileList[1].thumbUrl : '';
    var  addSql = 'INSERT INTO clubSQL( clubID, clubName, clubWordMessage, clubImgMessage, clubPhotos) VALUES(?,?,?,?,?)';
    var  addSqlParams = [clubID, clubName, clubWordMessage, clubImg.fileList[0].thumbUrl, clubPhotos];
    
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

  
  if (option == 'updateWord') {
    let updateSql = 'UPDATE clubSQL SET clubWordMessage = ? WHERE clubID = ?';
    let updateSqlParams = [clubWordMessage ,clubID];

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

  if (option == 'updateImg') {
    let clubImgMessage = clubImg[0].url ? clubImg[0].url : clubImg[0].thumbUrl
    let clubPhotos = clubImg.length > 1 ? (clubImg[1].url ? clubImg[1].url : clubImg[1].thumbUrl) : '';
    let updateSql = 'UPDATE clubSQL SET clubImgMessage = ?, clubPhotos = ? WHERE clubID = ?';
    let updateSqlParams = [clubImgMessage, clubPhotos ,clubID];

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
