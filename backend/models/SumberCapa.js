import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize

const Source = db.define('source',
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
    }
},{
    freezeTableName:true
});

export default Source;



// (async()=>{
//     await db.sync()
// })()