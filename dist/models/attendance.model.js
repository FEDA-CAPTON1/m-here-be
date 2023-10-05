"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class AttendanceInstance extends sequelize_1.Model {
}
exports.AttendanceInstance = AttendanceInstance;
AttendanceInstance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    attendanceEnum: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["YES", "NO"],
        allowNull: false
    },
    reason: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: db_config_1.default,
    tableName: 'attendance'
});
//# sourceMappingURL=attendance.model.js.map