import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Temuan from "./TemuanModels.js";

const {DataTypes} = Sequelize

const Dpt = db.define('dpt',
{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    initial:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[1,10]
        }
    }
},{
    freezeTableName:true
});

export default Dpt;