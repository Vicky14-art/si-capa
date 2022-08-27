import Temuan from "./TemuanModels.js";
import Users from "./UserModel.js";
import Dpt from "./DptModels.js"
import Justifikasi from "./JustifikasiModels.js"
import Source from "./SumberCapa.js";



Users.hasMany(Temuan);
Dpt.hasMany(Temuan);
Temuan.hasMany(Justifikasi);
Source.hasMany(Temuan);


Temuan.belongsTo(Source, {foreignKey:'sourceId'});
Justifikasi.belongsTo(Temuan, {foreignKey:'temuanId'});
Temuan.belongsTo(Users, {foreignKey:"userId"})
Temuan.belongsTo(Dpt, {foreignKey:"dptId"})


export{Temuan,Users, Dpt, Justifikasi, Source};




