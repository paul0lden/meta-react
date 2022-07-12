import { useContext, useState, useEffect } from "preact/hooks";
import { Api } from "../Api";
import "./chat.style.css";

export const Chat = () => {
  const { api, loading } = useContext(Api);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const chat = async () => {
    await api.chat.subscribe({room: "id1"});
    api.chat.on('message', ({ message }) => {
      setMessages((prev) => [...prev, { message, id: Math.floor(Math.random() * 10000) }]);
    });
  }

  const sendMessage = async () => {
    await api.chat.send({ room: "id1", message: text });
    setText('');
  }

  useEffect(() => {
    if (!loading) {
      chat();
    }
  }, [loading]);
  
  return (
    <div className="chat">
      <div className="chat__message-box">
        {messages.map(({message, id}) => <p id={id}>{message}</p>)}        
      </div>
      <div className="chat__controls">
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};
