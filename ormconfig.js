const dotenv = require('dotenv');
dotenv.config()

const {
  SQL_TYPE,
  SQL_HOST,
  SQL_PORT,
  SQL_USERNAME,
  SQL_PASSWORD,
  SQL_DATABASE,
  RUNNING_SQL_ENTITIES,
  RUNNING_SQL_MIGRATIONS,
  SQL_MIGRATIONS_CLI
} = process.env;

module.exports = {
  type: SQL_TYPE,
  host: SQL_HOST,
  port: SQL_PORT,
  username: SQL_USERNAME,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
  entities: [RUNNING_SQL_ENTITIES],
  migrations: [RUNNING_SQL_MIGRATIONS],
  cli: {
    migrationsDir: SQL_MIGRATIONS_CLI
  },
};
