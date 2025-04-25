import { useEffect, useState } from "react";
import '../App.css';
import React from 'react';

function DataList(props) {
  
  const [data, setData] = useState([]);

  //Novos estados para páginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1); // total de páginas

  const itensPorPagina = 5; // quantidade de itens por página


  // Estados para modal de inserção e edição
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModaltype] = useState(""); // edit ou insert
  const [selectedObjeto, setSelectedObjeto] = useState(null); // objeto selecionado para edição

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    foto: ""
  });

  useEffect(() => {
    fetchObjetos();
  }, [currentPage]); // atualiza a lista quando a página for alterada

  // Função para buscar os objetos de cada página
  const fetchObjetos = () => {
    fetch(`http://localhost:8900/objetos?page=${currentPage}&limit=${itensPorPagina}`)
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos:", data);
        setData(data.items);
        setTotalPaginas(data.pagination.totalPaginas); // atualiza o total de páginas
      })
      .catch(error => console.error("Erro ao buscar objetos:", error));
  };
  // exibe prévia da imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file){
      const reader = new FileReader(); // leitor de arquivo
      reader.readAsDataURL(file); // lê como base64
      reader.onload = () => {
        setFormData({ ...formData, foto: file, preview: reader.result}); // realiza a exbição prévia da imagem 
      }
    }
  };

  // Função para trocar de página
  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setCurrentPage(novaPagina);
    }
  };
 


  // Função para excluir um objeto liturgico
  const deleteObjetos = (id) => {
    fetch(`http://localhost:8900/delete/${id}`, { 
      method: "DELETE"
    })
    .then(response => {
      alert("Tem certeza que deseja excluir este Objeto Litúrgico?")
      if (response.ok) {
        setData(data.filter(user => user.id !== id)); // Atualiza a lista
      } else {
        console.error("Erro ao excluir um objeto");
      }
    })
    .catch(error => console.error("Erro ao excluir objeto:", error));
  };


  const handleEdit = (objeto) => {
    setSelectedObjeto(objeto);
    setModaltype("edit");
    setFormData({
      ...objeto, 
      foto: null,
      preview: objeto.foto ? `http://localhost:8900/uploads/${objeto.foto}`: null
    });
    setShowModal(true);
  };

  const handleInsert = () => {
    setModaltype("insert");
    setFormData({ nome: "", descricao: "", preco: "", quantidade: "", foto: "" });
    setShowModal(true);
  };

  const handleSubmit = () => {
    // validação básica dos campos obrigatórios
    if(!formData.nome.trim()){
      alert("O nome é obrigatório!");
      return;
    }

    if(!formData.descricao.trim()){
      alert("A descrição é obrigatória!");
      return;
    }

    if(!formData.preco || isNaN(formData.preco) || parseFloat(formData.preco) <= 0){
      alert("O preço deve ser um número válido e maior que zero!");
      return;
    }

    if(formData.quantidade ==="" || isNaN(formData.quantidade) || parseFloat(formData.quantidade) < 0){
      alert("A quantidade deve ser um número válido ou igual a zero!");
      return;
    }

    const formDataUpload  = new FormData();
    formDataUpload.append("nome", formData.nome);
    formDataUpload.append("descricao", formData.descricao);
    formDataUpload.append("preco", formData.preco);
    formDataUpload.append("quantidade", formData.quantidade);
    if(formData.foto)
      formDataUpload.append("foto", formData.foto)
    
    console.log("Dados enviados: ", formDataUpload);
    
    const url = modalType === "edit"
    ? `http://localhost:8900/edit/${selectedObjeto.id}`
    : "http://localhost:8900/insert";

    const method = modalType === "edit" ? "PUT" : "POST";

    fetch(url, {
      method: method,
      body: formDataUpload
    }).then(response => {
      if (response.ok) {
        fetchObjetos();
        alert(`Objeto Litúrgico ${modalType === "edit" ? "atualizado" : "inserido"} com sucesso!`);
        setShowModal(false);
      }
    }).catch(error => console.error("Erro ao salvar objeto litúrgico: ", error));
  };

  return (
    <div>
      <h1 className="title">Lista de Objetos Litúrgicos</h1>
      <button onClick={handleInsert} className="insert-button">Inserir Objeto Litúrgico</button>

      {showModal && (
      <div className="modal">
        <h2>{modalType === "edit" ? "Editar Objeto Litúrgico" : "Inserir Objeto Litúrgico"}</h2>
        <input type="text" placeholder="Nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
        <input type="text" placeholder="Descrição" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} />  
        <input type="number" placeholder="Preço" value={formData.preco} onChange={(e) => setFormData({ ...formData, preco: e.target.value })} />
        <input type="number" placeholder="Quantidade" value={formData.quantidade} onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })} />
        
        {/* Upload da imagem */}
        <label className="custom-upload-button">
          Escolha uma imagem
        <input type="file" className="input-button" accept="image/*" onChange={handleImageUpload} />
        </label>
        
        {/* Exibir prévia da imagem */}
        {formData.preview && (
          <img src={formData.preview} alt="Prévia da imagem" 
          style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} />
        )}
        
        <button onClick={() => handleSubmit()} className="list-button">Salvar</button>
        <button onClick={() => setShowModal(false)} className="list-button">Cancelar</button>
      </div>
    )}

      <ul className="list">
        {data.map((objeto) => (
          <li key={objeto.id} className="list-li"> 
            {objeto.nome}<br /> 
            {objeto.preco}<br /> 
            {/* Exibir imagem se existir */}
            {objeto.foto && (
              <img src={`http://localhost:8900/uploads/${objeto.foto}`} alt={`Imagem do ${objeto.nome}`} 
              style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} />
            )}
            <br />
            <button onClick={() => props.clicked(objeto)} className="list-button">Ver Mais</button>
            <button onClick={() => deleteObjetos(objeto.id)} className="list-button">Excluir</button>
            <button onClick={() => handleEdit(objeto)} className="list-button">Editar</button>
          </li>
        ))}
      </ul>

      {/* Controle de paginação */}
      <div className="pagination">
        <button onClick={() => mudarPagina(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span> Página {currentPage} de {totalPaginas}</span>
        <button onClick={() => mudarPagina(currentPage + 1)} disabled={currentPage === totalPaginas}>Próximo </button>
      </div>
     

    </div>

  );
}

export default DataList;