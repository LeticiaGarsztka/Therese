import "../App.css"
import React from "react";

function Modal(props){
    return(
        <div className="modal">
            <div className="modal-content">
                <h1>Detalhes do Objeto</h1>
                <p><strong>ID: </strong>{props.itemClicked.id}</p>
                <p><strong>Nome: </strong>{props.itemClicked.nome}</p>
                <p><strong>Descrição: </strong>{props.itemClicked.descricao}</p>
                <p><strong>Preço: </strong>{props.itemClicked.preco}</p>
                <p><strong>Quantidade: </strong>{props.itemClicked.quantidade}</p>
                {props.itemClicked.foto && (
                <img src={`http://localhost:8900/uploads/${props.itemClicked.foto}`} alt={`Imagem do ${props.itemClicked.foto}`} 
                style={{ maxWidth: '350px', maxHeight: '350px', objectFit: 'contain' }} />
                )}
                <br></br>
                <button className="list-button" onClick={() => props.closeModal()}>Fechar</button>
            </div>
        </div>
    )
}

export default Modal;