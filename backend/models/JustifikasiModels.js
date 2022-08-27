import {Sequelize} from "sequelize";
import db from '../config/Database.js';
import Source from "./SumberCapa.js";
import User from "./UserModel.js";
import Dpt from "./DptModels.js";
import Temuan from "./TemuanModels.js";


const {DataTypes} = Sequelize

const Justifikasi = db.define('justifikasi',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    justifikasiNo:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    temuanId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    alasan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,500]
        }
    },
    pengkajian:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,500]
        }
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    }
},{
    freezeTableName:true
});

export default Justifikasi;


