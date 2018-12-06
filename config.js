module.exports = {
  host: process.env.DBHOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.DBPORT,
  appPort: process.env.PORT,
  nodeEnv: process.env.NODE_ENV
};