import{db} from "../db.js"
export const updateObjetos = (req, answer) => {
    const objId = req.params.id;  // pega id por parâmetro
  
    const { nome, descricao, preco, quantidade } = req.body;  // Dados a serem atualizados
    const foto = req.file ? req.file.filename : null;

    const qry = "update objetos set nome = ?, descricao = ?, preco = ?, quantidade = ?, foto = ? WHERE id = ?";
  
    db.query(qry, [nome, descricao, preco, quantidade, foto, objId], (erro, data) => {
      if (erro) {
        return answer.status(500).json({ error: "Erro ao atualizar Objeto Litúrgico!"});
      }
  
      // Verifica se o objeto foi realmente atualizado
      if (data.affectedRows === 0) {
        return answer.status(404).json({ message: "Objeto Litúrgico não encontrado!"});
      }
  
      return answer.status(200).json({ message: "Objeto Litúrgico atualizado com sucesso!"});

    });
  };