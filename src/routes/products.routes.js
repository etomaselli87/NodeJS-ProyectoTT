//CAPA DE RUTAS => DECLARAR RUTAS DE PRODUCTOS - DIRECCIONAR LA SOLICITUD ENTRANTE

//Se utiliza la librería express
import express from "express";

//Importo las funciones controladoras para obtener los productos 
import { getAllProducts, getProduct } from "../controllers/products.controllers.js";

const routes = express.Router();

//Se declara la ruta "/productos" con método get y su función controladora getAllProducts
routes.get("/products", getAllProducts);

//Se declara la ruta "/productos/:id" => path params, con método get y su función controladora getProduct
routes.get("/products/:id", getProduct);

//Exporta por defecto las distintas rutas con el llamado a su función controladora correspondiente
export default routes;