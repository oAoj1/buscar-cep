import { useState } from 'react'
import './index.css'
import { FiSearch } from 'react-icons/fi'
import api from './services/api.jsx'

export default function App() {

  const [cep,setCep] = useState('')
  const [resultado,setResultado] = useState({})

  async function handleCep(evento){
    evento.preventDefault()
    
    if(cep === ''){
      alert("Digite algum CEP")
      return
    }

    try{
      const response = await api.get(`${cep}/json`)
      setResultado(response.data)
      setCep("")

    }catch{
      alert("Erro ao buscar CEP")
      setCep("")

    }

  }

  return (
    <div className="App">
      <div className="container">
        <h1>Busque seu CEP</h1>
        
        <form action="" onSubmit={handleCep}>
          <input 
            value={cep}
            type="text" 
            placeholder='Digite o CEP'
            onChange={cep => setCep(cep.target.value)}
          />

          <button>
            <FiSearch size={25} color="#fff"></FiSearch>
          </button>
        </form>


        {Object.keys(resultado).length > 0 && 
        <main className='main'>
          <h2>CEP: {resultado.cep}</h2>

          <span><strong>Logradouro:</strong> {resultado.logradouro}</span>
          <span><strong>Complemento:</strong> {resultado.complemento}</span>
          <span><strong>Bairro:</strong> {resultado.bairro}</span>
          <span><strong>Estado/Cidade:</strong> {resultado.localidade} - {resultado.uf}</span>
        </main>}
        
      </div>
      
    </div>
  )
}
