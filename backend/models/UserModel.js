import {Sequelize} from "sequelize";
import db from '../config/Database.js';
import Dpt from "./DptModels.js";
import Temuan from "./TemuanModels.js";

const {DataTypes} = Sequelize

const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
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
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            isEmail:true 
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    dptId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    image:DataTypes.STRING,
    url:DataTypes.STRING
},{
    freezeTableName:true
})


Dpt.hasMany(Users);
Users.belongsTo(Dpt, {foreignKey:'dptId'})

export default Users

// (async()=>{
//     await db.sync()
// })()