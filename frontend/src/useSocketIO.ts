import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000", { autoConnect: false })


const useSocketIO = () =>
{
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([])

    const onConnect = () =>
    {
      setIsConnected(true);
  
      console.log("Connected! ", socket.id);
    }
  
    const onReconnect = (data: any) =>
    {
      setIsConnected(true)
  
      // The data here is the number of attempts to reconnect
      console.log("ReConnected! ", data);
    }
    
    const onDisconnect = () =>
    {
      setIsConnected(false);
    }

    const sendMessage = (message: string) =>
    {
        socket.emit("clientMessage", { data: message })
    }

    const receiveNewMessage = (newMessage: { data: string }) =>
    {
        setMessages(value => [...value, newMessage.data])
    }
  
    useEffect(() => 
    {
      socket.connect();
  
      socket.on('connect', onConnect);
      socket.io.on('reconnect', onReconnect);
      socket.on('disconnect', onDisconnect);
      socket.on("newMessageToClients", receiveNewMessage)
  
      return () => 
      {
        socket.off('connect', () => onConnect);
        socket.off('reconnect', onReconnect);
        socket.off('disconnect', () => onDisconnect);
        socket.off("newMessageToClients", receiveNewMessage)
      }
    }, [])

    return {
        isConnected,

        messages,

        sendMessage
    }
}

export default useSocketIO;