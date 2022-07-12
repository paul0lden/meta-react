import { useEffect, useState, useContext } from "react";
import logo from "./logo.svg";
import { Metacom } from "metacom";
import { Api } from "./Api";
import "./App.css";
import { Chat, RandomAdd } from "./components";

function App() {
  const protocol = location.protocol === "http:" ? "ws" : "wss";
  const metacom = Metacom.create(`${protocol}://${location.host}/api`);
  const [count, setCount] = useState(0);
  const [api, setApi] = useState(metacom.api);
  const [loading, setLoading] = useState(true);

  const counterHandler = async () => {
    if (!loading) {
      const res = await api.example.counter();
      setCount(res.result);
    }
  };

  useEffect(() => {
    (async () => {
      await metacom.load("example", "auth", "chat");
      setApi(metacom.api);
      await api.auth.signin({ login: "marcus", password: "marcus" });
      setLoading(false);
    })();
  }, [api]);

  return (
    <div className="App">
      <Api.Provider value={{ api, loading }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
          <RandomAdd />
          <p>
            <button type="button" onClick={counterHandler}>
              count is: {count}
            </button>
          </p>
          <p>
            Edit <code>App.jsx</code> and save to test HMR updates.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {" | "}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </header>
        <Chat />
      </Api.Provider>
    </div>
  );
}

export default App;
