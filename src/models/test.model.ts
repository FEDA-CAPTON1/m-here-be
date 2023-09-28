import { DataTypes, Model } from 'sequelize';
import { CreateTestInput } from '../schemas/test.schema';

import db from '../config/db.config';


export class Test extends 
    Model<CreateTestInput>{}

Test.init(
    {
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
    name: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
    sequelize: db,
    tableName: 'test'
    
});
