import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import useSocketIO from './useSocketIO';




function App() 
{
  const { isConnected, messages, sendMessage } = useSocketIO();

  const [message, setMessage] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    console.log(e.target.value);
    
    setMessage(e.target.value)
  }

  const handleButton = () =>
  {
    sendMessage(message);

    setMessage("")
  }


  console.log("messages: ", messages);
  

  return (
    <div className="App">
      <div className='flex justify-between w-full'>
        <input 
          className='border rounded-sm w-[90%] px-2'
          type={"text"}
          placeholder='Insert message here'
          value={message}
          
          onChange={handleInput}
          onKeyDown={e =>
          {
            if (e.code === "Enter") 
            {
              handleButton()
            }
          }}
        />

        <button 
          className='h-full px-5 py-2 bg-green-600 rounded-sm text-white'
          onClick={handleButton}
        >
          Send!
        </button>

      </div>

      <ul className='w-full ps-4'>
        {messages.map(message =>
          {
            return (
              <li className='text-start'>
                {message}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
