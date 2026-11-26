//CAPA CONTROLADORA => MANEJA LAS REQUESTS (Verificar solicitud) y RESPONSES (Responde cuando la capa de servicios le responde) 
//Solicitudes y Respuestas (+ Avisos Errores de Cliente o de Servidor)

import { getAllProductsService, getProductService, createProductService, deleteProductService } from "../services/products.services.js";

//Se obtiene Productos por categoría
//Utilizando metodología de manejo de errores (try/catch) y utilizando funciones de la capa de Servicios

//1-Función getProducts
export async function getAllProducts(req, res) {
    const category = req.query.category;
    try{
        const products = await getAllProductsService(category);
        if(products.length > 0){
            res.status(200).send({
                message: "Productos encontrados",
                data: products
            })
        }else{
            res.status(404).send({
                message: "Producto/s no encontrado/s"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "Error interno"
        })
    }
}

//2-Función getProductxId
export async function getProduct(req, res) {
    const id = req.params.id;
    if(id){
        try{
            const product = await getProductService(id);
            console.log(product)
            if(product){
                res.send({
                    message: "Producto encontrado",
                    data: product
                })
            }else{
                res.status(404).send({
                    message: "Producto no encontrado"
                })
            }
        }catch(error){
            //Aviso de Error Interno de Servidor (500)
            console.log("ERROR INTERNO", error)
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        //Si el ID no llega => error de solicitud del Cliente (400) - Bad Request
        res.status(400).send({
            message: "el id del producto es necesario"
        })
    }
}

//3-Función createProduct
export async function createProduct(req, res) {
    const product = req.body;
    if(product){
        try{
            const new_product = await createProductService(product)
            res.status(200).send({
                message: "Creación de producto exitosa",
                data: new_product
            })
        }catch(error){
            //Aviso de Error Interno de Servidor (500)
            console.log("ERROR INTERNO", error)
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        res.status(400).send({
        message: "el producto es necesario"
        })
    }
    
}

//4-Función deleteProduct
export async function deleteProduct(req, res) {
    const id = req.params.id;
    if(id){
        try{
            const id_eliminado = await deleteProductService(id);
            console.log(id_eliminado)
            if(id_eliminado){
                res.send({
                    message: "Producto Eliminado",
                    data: id
                })
            }else{
                res.status(404).send({
                    message: "Producto no encontrado"
                })
            }
        }catch(error){
            //Aviso de Error Interno de Servidor (500)
            console.log("ERROR INTERNO", error)
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        //Si el ID no llega => error de solicitud del Cliente (400) - Bad Request
        res.status(400).send({
            message: "el id del producto es necesario"
        })
    }
}
