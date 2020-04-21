var mysqlconf = {
    host: '111.229.220.211',
    user: 'root',
    database: 'admin',
    password: '101,liweifan',
    port: 3306
}

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var pool = mysql.createPool(mysqlconf);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret, errmsg = "操作失败") {
    if (typeof ret === 'undefined') {
        res.json({
            code: 0,
            msg: errmsg
        });
    } else {
        res.json(ret);
    }
};

// 1、注册开始
function addUser(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body;
    if (!param.username) {
        jsonWrite(res, undefined, "用户名不能为空");
        return;
    }
    if (!param.password) {
        jsonWrite(res, undefined, "密码不能为空");
        return;
    }
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT username FROM user WHERE username='${param.username}'`, function (err, result) {
            if (result.length > 0) {
                jsonWrite(res, undefined, "用户名已存在");
                // 释放连接 
                connection.release();
                return;
            } else {
                connection.query("INSERT INTO user(username, password) VALUES(?,?)", [param.username, param.password], function (err2, result2) {
                    if (result2) {
                        result2 = {
                            code: 1,
                            msg: '注册成功'
                        };
                    }

                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result2, "用户名密码错误");

                    // 释放连接 
                    connection.release();
                });
            }
        })

    });
}
router.post('/addUser', function (req, res, next) {
    addUser(req, res, next);
});
//注册结束

// 2、登录开始
function signUp(req, res, next) {
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query;

        // 建立连接，匹配用户名密码
        connection.query("select username,password from user where username = '" + param.username + "' and password = '" + param.password + "'", function (err, result) {
            if (result.length > 0) {
                result = {
                    code: 200,
                    msg: '登录成功'
                };
            }else {
                result = undefined;
            }

            // 以json形式，把操作结果返回给前台页面
            jsonWrite(res, result, "用户名密码错误");

            // 释放连接 
            connection.release();
        });
    });
}
router.get('/signUp', function (req, res, next) {
    signUp(req, res, next);
});
//登录结束

// 3、创建商品分类开始
function addProductsCategories(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body;
    if (!param.user_id) {
        jsonWrite(res, undefined, "user_id不能为空");
        return;
    }
    if (!param.category_name) {
        jsonWrite(res, undefined, "分类名称不能为空");
        return;
    }
    pool.getConnection(function (err, connection) {
        connection.query("select user_id,category_name from products_categories where user_id = '" + param.user_id + "' and category_name = '" + param.category_name + "'", function (err, result) {
            if (result.length > 0) {
                jsonWrite(res, undefined, "分类已存在");
                // 释放连接 
                connection.release();
                return;
            } else {
                connection.query("INSERT INTO products_categories(user_id, category_name) VALUES(?,?)", [param.user_id, param.category_name], function (err2, result2) {
                    if (result2) {
                        result2 = {
                            code: 1,
                            msg: '添加成功'
                        };
                    }

                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result2);

                    // 释放连接 
                    connection.release();
                });
            }
        })

    });
}
router.post('/addProductsCategories', function (req, res, next) {
    addProductsCategories(req, res, next);
});
//创建商品分类结束

// 4、获取商品分类开始
function getCategories(req, res, next) {
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var param = req.query;

        // 建立连接，匹配用户名密码
        connection.query("select user_id from products_categories where user_id = '" + param.user_id + "'", function (err, result) {
            if (result.length > 0) {
                result = {
                    code: 200,
                    msg: '获取成功'
                };
            }else {
                result = undefined;
            }

            // 以json形式，把操作结果返回给前台页面
            jsonWrite(res, result, "用户不存在");

            // 释放连接 
            connection.release();
        });
    });
}
router.get('/getCategories', function (req, res, next) {
    getCategories(req, res, next);
});
//获取商品分类结束

// 5、创建商品开始
function addProducts(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body;
    if (!param.user_id) {
        jsonWrite(res, undefined, "user_id不能为空");
        return;
    }
    if (!param.category_name) {
        jsonWrite(res, undefined, "分类名称不能为空");
        return;
    }
    pool.getConnection(function (err, connection) {
        connection.query("select user_id,category_name from products_categories where user_id = '" + param.user_id + "' and category_name = '" + param.category_name + "'", function (err, result) {
            if (result.length > 0) {
                jsonWrite(res, undefined, "分类已存在");
                // 释放连接 
                connection.release();
                return;
            } else {
                connection.query("INSERT INTO products_categories(user_id, category_name) VALUES(?,?)", [param.user_id, param.category_name], function (err2, result2) {
                    if (result2) {
                        result2 = {
                            code: 1,
                            msg: '添加成功'
                        };
                    }

                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result2);

                    // 释放连接 
                    connection.release();
                });
            }
        })

    });
}
router.post('/addProducts', function (req, res, next) {
    addProducts(req, res, next);
});
//创建商品结束

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen(3003, () => {
    console.log("Server is running");
});