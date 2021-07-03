module.exports = {
	devServer: {
		proxy: {
			"^/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				logLevel: "debug",
				pathRewrite: { "^/api": "/" },
			},
		},
	},
	publicPath:
		process.env.NODE_ENV === "production" ? "/vue-task-tracker/" : "/",
};
