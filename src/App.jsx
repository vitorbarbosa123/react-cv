import { useEffect, useState } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer';

import './App.css'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [imageValue, setImageValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [errorValue, setErrorValue] = useState('')
  
  const handleImage = async (event) => {
      event.preventDefault()
      try {
        await axios.post('http://127.0.0.1:5000/images', { input_value: inputValue })
        .then(response => {
          setImageValue(response.config.url);
          setErrorValue('')
        })
        
        axios.get('http://127.0.0.1:5000/images' , {
          headers: {
            'Accept': 'image/jpeg'
          },
          responseType: 'arraybuffer'
        })
        .then(response => {
          const image = new Image()
          image.src = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
          setImageValue(image.src)
        })

        axios.get('http://127.0.0.1:5000/text')
        .then(response => {
          setTextValue(response.data)
        })
      } catch(error){
        setErrorValue(error.message)
      }
    }
 
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="App">

      <h2>Processamento de textos em imagem</h2>
      <p>Envie uma imagem da web e remova o texto contida nela</p>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="link"
        />
        <button onClick={handleImage}>Enviar</button>
      </form>
      {
        errorValue && <p style={{"fontWeight": "bold", color: "coral"}}>Link inválido, por favor troque-o</p>
      }
      <div>
        {imageValue && 
        <div>
          <h4>Imagem tratada:</h4>
          <img className='img' src={imageValue}/>
        </div>}
      </div>
      {textValue && 
        <div className='text-wrapper'>
          <h4>Texto: </h4>
          {textValue}</div>
      }
    </div>
  )
}

export default App
