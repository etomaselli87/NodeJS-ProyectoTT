//CAPA DE MODELO => Funciones para manipular colecciones y documentos => Importo funciones de Filestore


import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from 'firebase/firestore';

import { db } from '../data/data.js';



export const obtenerProductos = async () => {
  try {
    //Busca los documentos de la colleccion, los mapea y le extrae el id y data
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error obteniendo la colección PRODUCTS:`, error);
    throw error;
  }
};


export const obtenerPorId = async (idDocumento) => {
  try {
    const docRef = doc(db,  "products", idDocumento);
    const docSnap = await getDoc(docRef);
    //Método 'exists' devuelve true/false si existe o no el documento (devuelve null si no existe)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error obteniendo el documento con ID ${idDocumento}:`, error);
    throw error;
  }
};


export const buscarPorConsulta = async (valor) => {
  try {
    const q = query(collection(db, "products"), where("categoria", "==", valor));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error realizando la consulta en products:`, error);
    throw error;
  }
};