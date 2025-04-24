import { db } from "../db.js";

export const deleteObjetos = (req, res) => {
    const objId = req.params.id; // pegar apenas o ID

    console.log("Tentando excluir objeto com ID:", objId);

    const qry = "DELETE FROM objetos WHERE id = ?";

    db.query(qry, [objId], (erro, data) => {
        if (erro) {
            return res.status(500).json({ error: "Erro ao excluir este Objeto Litúrgico!" });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Objeto Litúrgico não encontrado." });
        }

        res.status(200).json({ message: "Objeto Litúrgico excluído com sucesso!" });
    });
};