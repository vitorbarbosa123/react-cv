import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
 
  const [mensage, setMensage] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/images', { input_value: inputValue})
      .then(response => {
        setMensage(response.data.mensage)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="App">
      <p>
        Upload de arquivo
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="link"
        />
        <button type="submit">Enviar</button>
      </form>
      <p>{mensage}</p>
    </div>
  )
}

export default App
