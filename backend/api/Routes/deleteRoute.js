import express from 'express';
import {deleteObjetos} from '../Controllers/deleteObjetos.js';  // Função para excluir o usuário

const deletar = express.Router();

// Rota para excluir um usuário com base no ID
deletar.delete('/delete/:id', deleteObjetos);  // A URL será /users/delete/:id

export default deletar;