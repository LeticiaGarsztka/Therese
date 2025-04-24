import express from 'express';
import {getObjetos} from  '../Controllers/objetos.js';

const router = express.Router();
// adicionando suporte à paginação via query params

router.get("/objetos",(req,res)=>{
    console.log(`consulta: Página ${req.query.page || 1}, Limit: ${req.query.limit || 5}`);
    getObjetos(req,res);
});

export default router