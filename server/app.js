const jsonServer = require("json-server");
const server = jsonServer.create()
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

router.render = (req, res) => {
	if (/user/gi.test(req.originalUrl) && req.originalMethod == "GET") {
		if(!req.query.name || !req.query.pwd) {
			return res.json({
				code: 500,
				msg: "missing params"
			})
		}
		if (res.locals.data.length > 0) { 
			res.json({
				code: 200,
				data: res.locals.data[0]
			})
		} else {
			res.json({
				code: 500,
				msg: "用户名或密码错误"
			})
		}
	}else {
		res.json({
			code: 200,
			data: res.locals.data
		})
	}
}

server.use(router);
server.listen(8081, () => {
	console.log("JSON Server is running at localhost:8081");
});
