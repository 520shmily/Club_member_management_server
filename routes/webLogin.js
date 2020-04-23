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

router.post('/login',function(req,res){
  const { systemID, systemPW, type } = req.body;

  let sql = `SELECT * FROM systemSQL WHERE systemID = "${systemID}" && systemPW = "${systemPW}"`;
 
  connection.query(sql,function(err,result){
    if(err){
        console.log('[SELECT ERROR] - ', err.message);
        res.json(result); 
        return;
    }

    if (systemID == 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
        systemID: systemID,
        currentUser: {
          name: systemID,
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        }
      });
      return;
    } 
    
    if (result.length !== 0 && systemID === result[0].systemID && systemPW === result[0].systemPW) {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
        systemID: systemID,
        currentUser: {
          name: result[0].systemName,
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        }
      });
      return;
    }

    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
        systemID: systemID,
        currentUser: {
          name: 'admin',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        }
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
      systemID: '',
      currentUser: {
        name: '',
        avatar: '',
      }
    });
  }); 
})   

module.exports = router;
