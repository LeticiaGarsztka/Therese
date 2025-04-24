import express from 'express';
import {insertObjetos} from '../Controllers/insertObjetos.js';

const inserir = express.Router();

// rota para inserir um usuário
inserir.post('/insert', insertObjetos);

export default inserir;
