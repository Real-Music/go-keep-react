const http = require("http");
const app = require("./app");
const { sequelize } = require("./database/models");
const config = require("./database/config/config");
const server = http.createServer(app);

sequelize.sync({ force: true }).then(() => {
  server.listen(config.PORT, () => {
    console.log();
    console.log(`Go-keep server running at http://localhost:${config.PORT}`);
  });
});
