import { useContext, useState, useEffect } from "preact/hooks";
import { Api } from "../Api";

export const RandomAdd = () => {
  const [result, setResult] = useState();
  const { api, loading } = useContext(Api);

  const add = async () => {
    if (!loading) {
      const res = await api.example.add({
        a: Math.floor(Math.random() * 10000),
        b: Math.floor(Math.random() * 10000),
      });
      setResult(res);
    }
  };

  useEffect(() => {
    add();
  }, [loading]);

  return <button onClick={add}>{result}</button>;
};
