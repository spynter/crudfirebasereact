import React, { useState } from 'react'
import { Stack, Container, Form, Button} from 'react-bootstrap';

import fireBaseApp from '../credenciales';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider,    
} from "firebase/auth";
const auth = getAuth(fireBaseApp);
const googleProvider = new GoogleAuthProvider();

const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function SubmitHandler(e) {
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contraseña = e.target.formBasicPassword.value;
        
        if (estaRegistrandose) {
            //si se registra
            const usuario = await createUserWithEmailAndPassword(
                auth, 
                correo, 
                contraseña
            );
        } else {
            //si esta iniciando sesion
            signInWithEmailAndPassword(auth, correo, contraseña)
        }
    }

  return ( 
  <Container>
    <Stack gap={3}>
    <h1>{estaRegistrandose ? "Regístrate" : "inicia sesión"}</h1>
    <Form onSubmit={SubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="dark" type="submit">
        {estaRegistrandose ? "Regístrate" : "inicia sesión"}
      </Button>
    </Form>

    <Button variant="primary" type="submit" style={{ width: "300px" }} onClick={() => signInWithRedirect(auth, googleProvider)}>
        Acceder con Google
      </Button>
    
      <Button 
      style={{ width: "300px" }}
      variant="primary" 
      onClick={()=> setEstaRegistrandose(!estaRegistrandose)}
      >
      {estaRegistrandose ? "¿Ya tienes cuenta? Inicia sesión": "¿No tienes cuenta? Regístrate"}
      </Button>
    
    </Stack>
  </Container>
);
};

export default Logueo;