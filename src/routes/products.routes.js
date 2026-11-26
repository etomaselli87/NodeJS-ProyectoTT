//CAPA DE RUTAS => DECLARAR RUTAS DE PRODUCTOS - DIRECCIONAR LA SOLICITUD ENTRANTE

//Se utiliza la librería express
import express from "express";

//Se importa middleware de autenticación
import { authentication } from "../middlewares/authentication.js";

//Importo las funciones controladoras para obtener los productos 
import { getAllProducts, getProduct, createProduct, deleteProduct } from "../controllers/products.controllers.js";

const routes = express.Router();


//Se declara la ruta "/productos" con método get y su función controladora getAllProducts
routes.get("/products", getAllProducts);

//Se declara la ruta "/productos/:id" => path params, con método get y su función controladora getProduct
routes.get("/products/:id", getProduct);

routes.post("/products/create", authentication, createProduct);

routes.delete("/products/delete", authentication, deleteProduct);


//Exporta por defecto las distintas rutas con el llamado a su función controladora correspondiente
export default routes;