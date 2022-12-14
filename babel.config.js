module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // 빌드시 console.log없애는 플러그인 (transform-remove-console)
  // 설치 npm install babel-plugin-transform-remove-console --save-dev
  plugins: [
    process.env.NODE_ENV === "production" ? "transform-remove-console" : {},
  ],
};
