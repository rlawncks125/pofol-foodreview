const { codegen } = require("swagger-axios-codegen");

const url = "http://myapi.kimjuchan97.xyz";

codegen({
  methodNameMode: "operationId",
  //  주소
  remoteUrl: `${url}/api-json`,
  //  아웃 파일
  outputDir: `./src/assets/swagger`,
  useStaticMethod: true,
});

// npm
// npm install --save swagger-axios-codegen
