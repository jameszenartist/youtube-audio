const http = require("http");

const url = require("url");
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const port = env === "development" ? 3000 : 5000;
const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  path = path.replace(/^\/+|\/+$/g, "");

  console.log(path);
  console.log(`Dir name is: ${__dirname}`);
  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();
  req.on("data", () => {
    console.log(`got some data to send.`);
  });
  req.on("end", () => {
    console.log(`send a response`);
    let route =
      typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    let data = {
      path: path,
      queryString: qs,
      headers: headers,
      method: method,
    };
    route(data, res);
  });

  // const resHeaders = res.getHeaders();
  // let dataObj = {
  //   id: 123,
  //   name: "james",
  //   email: "james@home.org",
  //   resHeaders: resHeaders,
  // };
  // let data = JSON.stringify(dataObj);
  // res.end(data + "\n");
});

server.listen(port, () => {
  console.log(`listening for ${env} on port ${port}`);
});

function handler(payload) {
  return function (data, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    payload.resHeaders = res.getHeaders();
    let string = JSON.stringify(payload);
    res.writeHead(payload.code);
    res.write(string);
    res.end(`\n`);
  };
}

const routes = {
  "": handler({
    message: "this is the home page",
    code: 200,
  }),
  about: handler({
    message: "this is the about page",
    code: 200,
  }),
  notFound: handler({
    message: "File Not Found",
    code: 404,
  }),
};
