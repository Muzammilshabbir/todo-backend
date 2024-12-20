import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import enVariables from "../config/config.json";
require("dotenv").config();

const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const db = {};

let sequelize;
const config = enVariables[env];

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: true
  });
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize.DataTypes
      );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
