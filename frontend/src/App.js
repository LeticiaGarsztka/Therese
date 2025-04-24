import logo from './logoTherese.png';
import './App.css';
import About from './components/About';
import DataList from './components/DataList';
import Modal from './components/Modal';
import { useState } from 'react';

function App() {
  const[modalOpen, setModalIsOpen] = useState(false);
  const[itemClicked, setItemClicked] = useState(null);

  function clicked(item){
    console.log("Clicou");
    setModalIsOpen(true);
    setItemClicked(item);
  }

  function closeModal(){
    setModalIsOpen(false);
    setItemClicked(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Thérèse Objetos Litúrgicos</h2>
        <img src={logo} className="App-logo" alt="logo" />

        <About></About>
        <DataList clicked={clicked}></DataList>
        {modalOpen && <Modal itemClicked={itemClicked} closeModal={closeModal} /> }

      </header>
    </div>
  );
}

export default App;
