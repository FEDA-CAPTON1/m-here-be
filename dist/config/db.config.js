"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(`mysql://${process.env.DB_USER}:@${process.env.DB_HOST}/mysql`); // Example for postgres
exports.default = db;
//# sourceMappingURL=db.config.js.map