var path = require("path");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "views": path.resolve(__dirname, "src/views"),
                "store": path.resolve(__dirname, "src/store"),
                "router": path.resolve(__dirname, "src/router"),
                "components": path.resolve(__dirname, "src/components"),
                "utils": path.resolve(__dirname, "src/utils"),
                "style": path.resolve(__dirname, "src/style")
            }
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3003",
                pathRewrite: { "^/api": "" },
                changeOrigin: true
            }
        }
    }
}