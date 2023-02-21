import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [imageValue, setImageValue] = useState('')

  const handleImage = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/images', { input_value: inputValue})
      .then(response => {
        setImageValue(response.data);
      })
    } catch(error){
      console.error(error);
    }
  }
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="App">
      <p>
        Upload de arquivo
      </p>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="link"
        />
        <button onClick={handleImage}>Enviar</button>
      </form>
      <div>
        {imageValue && <img src="http://127.0.0.1:5000/images"/>}
      </div>
    </div>
  )
}


export default App
