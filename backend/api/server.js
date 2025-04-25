import express from "express";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import router from "./Routes/objetosRoute.js";
import deleteRouter from "./Routes/deleteRoute.js";
import updateRouter from "./Routes/updateRoute.js";
import insertRouter from "./Routes/insertRoute.js";
import { db } from "./db.js";
const app = express();

// Middleware de CORS e JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Multer (antes de ser usado)
const armazenamento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo
    }
});
// Inicializa Multer corretamente após definir `armazenamento`
const upload = multer({ storage: armazenamento });

// Configuração para servir arquivos estáticos da pasta `uploads`
app.use("/uploads", express.static("uploads"));

// Rotas adicionais
app.use("/", router); // GET
app.use("/", deleteRouter); // DELETE /delete/:id
app.put("/edit/:id", upload.single('foto'), updateRouter); // PUT /edit/:id
app.post("/insert", upload.single('foto'), insertRouter); // POST /insert

// Inicia o servidor
app.listen(8900, () => {
    console.log("Servidor rodando na porta 8900...");
});