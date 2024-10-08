import Menu from "./Components/Menu";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Ajuda from "./Pages/Ajuda";
import Politicas from "./Pages/Politicas";
import NotFound from "./Pages/NotFound";
import Rodape from "./Components/Rodape";
import filmes from "./Pages/filmes";
import EditarTarefa from "./Pages/EditarTarefa";
import NovaTarefa from "./Pages/NovaTarefa";
import {Toaster} from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { UsuarioContext } from "./contexts/UsuarioContexts";

//BrowserRouter 

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  //resolve o problema de carregar a tela do login quando atualiza (linhas 24, 30, 34, 35 e 36)
  const [loading, setLoading] = useState(true); 

  useEffect(() =>{
    //essa função monitora/detecta o usuário conectado
    onAuthStateChanged(auth, (user) => {
      setUsuarioLogado(user);
      setLoading(false);
    })
  }, []);

  if(loading) {
    return null;
  }

  return (
    <>
      <UsuarioContext.Provider value={usuarioLogado}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/ajuda" element={<Ajuda />} />
            <Route path="/filmes/adicionar" element={<NovaTarefa />} />
            <Route path="/filmes/editar/:id" element={<EditarTarefa/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" />
      </UsuarioContext.Provider>
    </>
  );
}

export default App;
