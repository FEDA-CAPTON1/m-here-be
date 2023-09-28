import { DataTypes, Model } from 'sequelize';
import { CreateUserInput } from '../schemas/user.schema';

import db from '../config/db.config';

import { AttendanceInstance } from './attendance.model'
import { ReportInstance } from './report.model'


export class UserInstance extends 
    Model<CreateUserInput>{}

UserInstance.init(
    {
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
    firstName: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
    password: {
            type: DataTypes.BOOLEAN,
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
    sequelize: db,
    tableName: 'users'
    
});

UserInstance.hasMany(AttendanceInstance,
    {
        foreignKey: "userId",
        as: "attendance"
    });
AttendanceInstance.belongsTo(UserInstance, {
    foreignKey: 'userId',
    as: 'user'
})

UserInstance.hasMany(ReportInstance,
    {
        foreignKey: "userId",
        as: "report"
    });
ReportInstance.belongsTo(UserInstance, {
    foreignKey: 'userId',
    as: 'user'
})