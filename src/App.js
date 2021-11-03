import { useEffect, useState } from "react";
import { GlobalStyles } from "./GlobalStyles";
import Router from "./routes";
import { api } from "./services/api";
import { signIn } from "./services/security";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /*//executar o login hard code
  useEffect(() => {
    const doSignIn = async () => {
      try {
        const response = await api.post("/sessions", {
          email: "rafanleme@gmail.com",
          password: "123456"
        });

        signIn(response.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    doSignIn();
  }, []);*/

  //efetuar o login do usuario de forma fixa no codigo
  useEffect(() => {

    
    const doLogin = async () =>{
       try { let response = await api.post("/sessions", {
        email: "rafanleme@gmail.com",
        password: "123456",
      })
      signIn(response.data);
    }catch (error){
      setError(true)
      alert(error.response.data.error)
       }finally{
         setLoading(false)
       }
     
    }

    doLogin();
  }, []);

  return (
    <>
      <GlobalStyles />
      {loading ? "Carregando..." : error ? "Ops, algo deu errado" : <Router />}
    </>
  );
}

export default App;
