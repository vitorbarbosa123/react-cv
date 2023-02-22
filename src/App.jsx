import { useEffect, useState } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer';

import './App.css'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [imageValue, setImageValue] = useState('')
  const [textValue, setTextValue] = useState('')
  
  const handleImage = async (event) => {
      event.preventDefault()
      try {
        await axios.post('http://127.0.0.1:5000/images', { input_value: inputValue })
        .then(response => {
          setImageValue(response.config.url);
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
        {imageValue && <img src={imageValue}/>}
        {textValue && <p>{textValue}</p>}
      </div>
    </div>
  )
}


export default App
