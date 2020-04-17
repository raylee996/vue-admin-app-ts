const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

router.render = (req, res) => {
	console.log(res.statusCode)
	if(res.statusCode == 200) {
		if (/user/gi.test(req.originalUrl)) {
			if (req.originalMethod == "GET") {
				if (!req.query.name || !req.query.pwd) {
					return res.status(500).json({
						status: 0,
						msg: "缺少参数"
					})
				}
				if (res.locals.data.length > 0) {
					res.json({
						status: 1,
						msg: "登录成功",
						data: res.locals.data[0]
					})
				} else {
					res.status(500).json({
						status: 0,
						msg: "用户名或密码错误"
					})
				}
			} else {
				res.json({
					status: 1,
					msg: "注册成功",
					data: res.locals.data
				})
			}
		} else {
			res.json({
				status: 1,
				data: res.locals.data
			})
		}
	}else {
		res.json({
			status: 0,
			msg: "url error"
		})
	}
};


server.use(router);
server.listen(8081, () => {
	console.log("JSON Server is running at localhost:8081");
});
