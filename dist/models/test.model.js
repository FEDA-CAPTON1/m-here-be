"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Test extends sequelize_1.Model {
}
exports.Test = Test;
Test.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Name is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Role name is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Address is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
}, {
    sequelize: db_config_1.default,
    tableName: 'test'
});
//# sourceMappingURL=test.model.js.map