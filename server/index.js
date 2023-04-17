const http = require("http");
const app = require("./app");
// const config = require('./utils/config');
const server = http.createServer(app);

// const PORT = config.PORT;
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
