import React, { useState, useEffect } from "react";
import Home from "./componentes/Home";
import Logueo from "./componentes/Logueo";

import fireBaseApp from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(fireBaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //código en caso de que haya sesión iniciada
      setUsuarioGlobal(usuarioFirebase);
    } else {
      //código en caso e que no haya sesión iniciada
      setUsuarioGlobal(null);
    }
  });
  
  return ( <>
    {usuarioGlobal ? ( <Home correoUsuario={usuarioGlobal.email} />
    ) : (
    <Logueo />
    )}
    </>)
  

}

export default App;
