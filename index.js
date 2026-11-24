import express from "express";
import cors from "cors";

//Importo el objeto que trae las rutas declaradas
import rutasProductos from "./src/routes/products.routes.js";

const app = express();

//Prueba libreria nodemon control para desarrollador
console.log("Test nodemon");

app.use(cors());


app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

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
