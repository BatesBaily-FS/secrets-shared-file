require("dotenv").config({ path: "./.env" });
const fs = require("fs");

console.log(`Enviroment: ${process.env.NODE_ENV}`);

const secretKey = process.env.SECRET_KEY;
console.log(`The secret key is: ${secretKey}`);

const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const authenticate = (key) => {
  if (key === secretKey) {
    return "Authentication successful!";
  }
  return "Authentication failed!";
};

console.log(authenticate(secretKey));
console.log(authenticate("b782HD31Ac3"));

let directory_name = "./";
let filenames = fs.readdirSync(directory_name);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  let f = "Files in the directory: \n";
  filenames.forEach((file) => {
    f += `${file}\n`;
  });

  const authStatus = authenticate(secretKey);
  f += `\nAuthentication Firststatus: ${authStatus}`;

  res.end(f);
});

server.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});
