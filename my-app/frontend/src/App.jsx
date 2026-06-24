import axios from 'axios';
import { useState } from "react"

function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value)
  }

  const sendData = async (e) => {
    try {
      const response = await axios.post('http://localhost:3000/', {
        prompt: inputValue
      })
      setMessages(e => [...e, `user: ${inputValue}\n`, `AI: ${response.data["message"]}`])
    } catch (error) {
      setMessages(e => [...e, `user: ${inputValue}`, `AI: ${JSON.stringify(error)}`])
    }
    setInputValue("")
  }

  return (
    <div className="flex bg-black h-screen">
      <div className="text-white border flex-3">
        <div>{
          messages.map((msg, index) => (
            <div key={index} className="whitespace-pre-wrap border-b border-gray-700 pb-1">
              {msg}
            </div>
          ))
        }
        </div>
        <input
          value={inputValue}
          onChange={handleChange}
          className="border text-white"
          placeholder='Insert prompt'
        />
        <button
          onClick={sendData}
          className="cyan bg-white text-black"
        >Submit</button>
      </div>
      <iframe src="http://localhost:5170/" className="flex-7"></iframe>
    </div>
  )
}

export default App
