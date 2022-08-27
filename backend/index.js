import express from 'express';
import File_Upload from 'express-fileupload';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import SequelizeStore from 'connect-session-sequelize';
import db from './config/Database.js';
import './models/index.js';


//ROUTER
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductsRoute.js";
import AuthRoute from './routes/AuthRoute.js';
import DptRoute from './routes/DptRoute.js';
import SourceRoute from './routes/SourceRoute.js';
import TemuanRoute from './routes/TemuanRoute.js';
import Justifikasi from './routes/JustifikasiRoute.js';

dotenv.config()

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db:db
});




//MIDLEWARE
app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:'auto'
    }

}));

//cors
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.use(File_Upload());
//membuat folder public menjadi static file
app.use(express.static("public"))
app.use(UserRoute);
app.use(ProductRoute);  
app.use(AuthRoute);
app.use(DptRoute);
app.use(SourceRoute);
app.use(TemuanRoute);
app.use(Justifikasi);


(async()=>{
    await db.sync()
})()


// membuat table seasson
// store.sync();



app.listen(process.env.APP_PORT,()=>{
    console.log('Server Up And Running');
}) 

