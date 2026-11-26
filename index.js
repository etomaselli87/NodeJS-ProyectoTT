import express from "express";
import cors from "cors";

//Importo body-parser => librería transforma el texto plano del body en un objeto json para manipularla
import bodyParser from "body-parser";
//Importo el objeto que trae las rutas declaradas
import rutasProductos from "./src/routes/products.routes.js";
//Importo ruta de autenticación
import authRouter from './src/routes/auth.routes.js'; 



const app = express();

//Prueba libreria nodemon control para desarrollador
console.log("Test nodemon");

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.json()); 

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

//Ruta de autenticación
app.use('/auth', authRouter);
//Importo y expongo el objeto que contiene todas las Rutas, se agrega el "/api" (opcional) + llamado a las rutas de productos
app.use("/api", rutasProductos);


app.use((req, res, next) => {
    res.status(404).json({
        error: "404 ruta no encontrada",
        mensaje: `el recurso ${req.url} no existe`
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
