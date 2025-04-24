import{db} from "../db.js"
export const insertObjetos = (req, answer) => {
    const { nome, descricao, preco, quantidade } = req.body;  // Dados a serem inseridos
    const foto = req.file ? req.file.filename : null;

    const qry = "insert into objetos (nome, descricao, preco, quantidade, foto) VALUES (?, ?, ?, ?, ?)";

    console.log("Dados chegando no back");
  
    db.query(qry, [nome, descricao, parseFloat(preco), parseInt(quantidade), foto], (erro, data) => {
      if (erro) {
        return answer.status(500).json({ error: "Erro ao inserir Objeto Litúrgico!"});
      }
  
      // Verifica se o objeto foi realmente inserido
      if (data.affectedRows === 0) {
        return answer.status(404).json({ message: "Objeto Litúrgico não encontrado!"});
      }
  
      return answer.status(200).json({ message: "Objeto Litúrgico inserido com sucesso!"});

      
    });
  };