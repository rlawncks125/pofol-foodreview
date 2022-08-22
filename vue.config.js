const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.PORT || 8100,
    allowedHosts: "all",
  },
});
