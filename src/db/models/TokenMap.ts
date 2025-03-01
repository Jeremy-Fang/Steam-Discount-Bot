import { DataTypes, Model } from "sequelize";
import { client } from "../client";

export class TokenMap extends Model {}

TokenMap.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: client,
        modelName: 'TokenMap'
    }
);