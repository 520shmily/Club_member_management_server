var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

// 下面是解决跨域请求问题
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 小程序端接口
var weChatLoginRouter = require('./routes/weChatLogin');
var weChatActivityListRouter = require('./routes/weChatActivityList');
var weChatMyActivityRouter = require('./routes/weChatMyActivity');
var weChatActivityDetailRouter = require('./routes/weChatActivityDetail');
var weChatSignUpRouter = require('./routes/weChatSignUp');
var weChatIsSignUpRouter = require('./routes/weChatIsSignUp');
var weChatIsAllSignUpUpRouter = require('./routes/weChatIsAllSignUp');
var weChatGetThinksUpRouter = require('./routes/weChatGetThinks');
var weChatMyOnlyActivityRouter = require('./routes/weChatMyOnlyActivity');
var weChatGetImagesRouter = require('./routes/weChatGetImages');
var weChatGetclubMessageRouter = require('./routes/weChatGetclubMessage');
var weChatSuggestRouter = require('./routes/weChatSuggest');

// web端接口
var webSuggestRouter = require('./routes/webSuggest');
var webLoginRouter = require('./routes/webLogin');
var webGetAllClubManageMessgeRouter = require('./routes/webGetAllClubManageMessge');
var webDeleteSuggestRouter = require('./routes/webDeleteSuggest');
var webGetManageMessageRouter = require('./routes/webGetManageMessage');
var webClubMemberRouter = require('./routes/webClubMember');
var webGetMyActivityRouter = require('./routes/webGetMyActivity');
var webGetActivityRouter = require('./routes/webGetActivity');
var webGetClubMessageRouter = require('./routes/webGetClubMessage');
var webGetImageRouter = require('./routes/webGetImage');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 小程序端接口
app.use('/weChatlogin', weChatLoginRouter);      // 登录页面
app.use('/weChatActivityList', weChatActivityListRouter); // 活动列表
app.use('/weChatMyActivity', weChatMyActivityRouter);   // 我的活动
app.use('/weChatActivityDetail', weChatActivityDetailRouter);   // 活动详情页
app.use('/weChatSignUp', weChatSignUpRouter);   // 报名更新数据库
app.use('/weChatIsSignUp', weChatIsSignUpRouter);   // 获取活动报名状态
app.use('/weChatIsAllSignUp', weChatIsAllSignUpUpRouter);   // 获取所有我参与的活动报名状态
app.use('/weChatGetThinks', weChatGetThinksUpRouter);   // 获取某个活动的的所有评论
app.use('/weChatMyOnlyActivity', weChatMyOnlyActivityRouter);   // 获取我报名的所有活动
app.use('/weChatGetImages', weChatGetImagesRouter);   // 获取社团风采展的照片
app.use('/weChatGetclubMessage', weChatGetclubMessageRouter);   // 获取社团风简介的信息
app.use('/weChatSuggest', weChatSuggestRouter);   // 添加会员建议

// web端接口
app.use('/api', webSuggestRouter);   // 获取所有会员建议
app.use('/api', webLoginRouter);   // web端登录
app.use('/api', webGetAllClubManageMessgeRouter);   // 获取所有社团负责人
app.use('/api', webDeleteSuggestRouter);   // 删除指定会员建议
app.use('/api', webGetManageMessageRouter);   // 获取指定社团负责人信息 
app.use('/api', webClubMemberRouter);   // 会员相关操作  
app.use('/api', webGetMyActivityRouter);   // 会员活动相关操作  
app.use('/api', webGetActivityRouter);   // 社团活动相关操作  
app.use('/api', webGetClubMessageRouter);   // 社团信息相关操作  
app.use('/api', webGetImageRouter);   // 社团信息相关操作  


// catch 404 and forward to error handle
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
