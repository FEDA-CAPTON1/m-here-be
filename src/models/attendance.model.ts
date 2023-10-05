import { DataTypes, Model } from 'sequelize';
import { CreateAttendanceInput } from '../schemas/attendance.schema';

import db from '../config/db.config';

export class AttendanceInstance extends 
    Model<CreateAttendanceInput>{}

AttendanceInstance.init(
    {
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
    attendanceEnum: {
            type: DataTypes.ENUM,
            values: ["YES", "NO"],
            allowNull:false
        },
    reason: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, {
    sequelize: db,
    tableName: 'attendance'
});
