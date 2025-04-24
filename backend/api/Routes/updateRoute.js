import express from 'express';
import {updateObjetos} from '../Controllers/updateObjetos.js';

const atualizar = express.Router();

// rota para atualizar um objeto pelo id
atualizar.put('/edit/:id', updateObjetos);

export default atualizar;