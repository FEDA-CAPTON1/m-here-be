import { DataTypes, Model } from 'sequelize';
import { CreateReportInput } from '../schemas/report.schema';

import db from '../config/db.config';

export class ReportInstance extends 
    Model<CreateReportInput>{}

ReportInstance.init(
    {
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
    from: {
            type: DataTypes.STRING,
        allowNull: false,
            validate: {
            notNull: {
                msg: "Email is required"
            },
            notEmpty: {
                msg: "Enter your email"
            }
        }
        },
    details: {
            type: DataTypes.STRING,
        allowNull: false,
            validate: {
            notNull: {
                msg: "Details is required"
            },
            notEmpty: {
                msg: "Enter details"
            }
        }
        },
    recipients: {
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
    }, {
    sequelize: db,
    tableName: 'report'
    
});
