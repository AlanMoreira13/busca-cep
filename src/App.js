import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from "./services/api";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [cep, setcep] = useState({})

  async function handleSearch() {
    

    if(input === "") {
      alert("Digite um CEP!")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setcep(response.data)
      setInput("")
    } catch (error) {
      alert("Ops, erro na busca 🙁")
      setInput("")
    }
    
  }

  return (
    <div className="container">
      <h1 className="title">Busca CEP</h1>
      <div className="container-input">
        <input 
        type="text"
        placeholder="Digite um cep"
        value={input}
        onChange={(e) => setInput(e.target.value)}
         />
        <button className="btn-search" onClick={handleSearch}>
          <FaSearch className="icon" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h1>CEP: {cep.cep}</h1>
        <span>{cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
    )}
      
    </div>
  );
}

export default App;
