import {Sequelize} from "sequelize";
import db from '../config/Database.js';
import Source from "./SumberCapa.js";
import Justifikasi from "./JustifikasiModels.js";
import Dpt from "./DptModels.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize

const Temuan = db.define('temuan',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    noTemuan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    sourceId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    ringkasan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    },
    klasifikasi:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    },
    persyaratan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    },
    gapAnalysis:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    },
    rootId:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    perbaikan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    },
    pencegahan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    },
    userId:{
        type:DataTypes.INTEGER,
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
    date:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    bukti:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,1000]
        }
    }
},{
    freezeTableName:true
})


export default Temuan;


