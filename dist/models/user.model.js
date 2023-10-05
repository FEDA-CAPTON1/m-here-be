"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const attendance_model_1 = require("./attendance.model");
const report_model_1 = require("./report.model");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "First name is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Full name is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    otpToken: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    }
}, {
    sequelize: db_config_1.default,
    tableName: 'users'
});
UserInstance.hasMany(attendance_model_1.AttendanceInstance, {
    foreignKey: "userId",
    as: "attendance"
});
attendance_model_1.AttendanceInstance.belongsTo(UserInstance, {
    foreignKey: 'userId',
    as: 'user'
});
UserInstance.hasMany(report_model_1.ReportInstance, {
    foreignKey: "userId",
    as: "report"
});
report_model_1.ReportInstance.belongsTo(UserInstance, {
    foreignKey: 'userId',
    as: 'user'
});
//# sourceMappingURL=user.model.js.map