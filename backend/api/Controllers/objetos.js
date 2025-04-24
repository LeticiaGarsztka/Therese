import { db } from "../db.js";

export const getObjetos = (req,res) => {
console.log("Parâmetros da query recebidos: ", req.query);

// obter os parâmetros da query
  const page = parseInt(req.query.page) || 1 // página atual
  const limit = parseInt(req.query.limit) || 5 // 5 itens por página (padrão)

  // calcular offset para o sql
  const offset = (page - 1) * limit

  const sql = "SELECT id, nome, descricao, preco, quantidade, foto FROM objetos ORDER BY id DESC LIMIT ? OFFSET ?"; // ordenando por id decrescente

  // query para contar o número total de itens sem o limit/offset
  const queryCount = "SELECT COUNT(*) AS total FROM objetos";

  db.query(queryCount, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({error: 'Erro ao contar Objetos Litúrgicos!'});
    }

    const total = results[0].total;
    const totalPaginas = Math.ceil(total/limit);

    if(total == 0){
      return res.status(200).json({
        items: [],
        total: 0,
        totalPaginas: 0
      });
    }

    db.query(sql, [limit,offset], (err, data) =>{
      if(err){
        console.error(err);
        return res.status(500).json({error: 'Erro ao buscar Objetos Litúrgicos!'});
      }

      // conversão da imagem de buffer para base64
      const objetoFormatado = data.map(objeto =>({
        ...objeto,
        foto:objeto.foto ? objeto.foto.toString('base64') : null
      }))

      return res.status(200).json({
        items: objetoFormatado,
        pagination:{
          page:page,
          limit:limit,
          total:total,
          totalPaginas: totalPaginas
        }
      })
    })
  });
};

