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
    setMessages(e => [...e, `user: ${inputValue}`])
    setInputValue("")
    try {
      const response = await axios.post('http://localhost:3000/', {
        prompt: inputValue
      })
      setMessages(e => [...e, `AI: ${response.data["message"]}`])
    } catch (error) {
      setMessages(e => [...e, `AI: ${JSON.stringify(error)}`])
    }
  }

  return (
    <div className="flex bg-black h-screen">
      <div className="text-white border flex-3 text-wrap scroll-auto">
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
