import React, { useState, useEffect } from 'react';

import fireBaseApp from '../credenciales';
import {getAuth, signOut} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { Button, Container } from 'react-bootstrap';

import AgregarTarea from "../componentes/AgregarTarea";
import ListadoTareas from "../componentes/ListadoTareas";

const auth = getAuth(fireBaseApp);
const firestore = getFirestore(fireBaseApp);

const Home = ({ correoUsuario }) => {
    const [arrayTareas, setArrayTareas] = useState(null);
    const fakeData = [
        { id: 1, descripcion: "tarea falsa 1", url: "https://picsum.photos/420" },
        { id: 2, descripcion: "tarea falsa 2", url: "https://picsum.photos/410" },
        { id: 3, descripcion: "tarea falsa 3", url: "https://picsum.photos/430" },
    ];

    async function buscarDocumentoOCrearDocumento(idDocumento) {
        //crear referencia al documento
        const docuRef = doc(firestore, `usuario/${idDocumento}`);
        //buscar documento
        const consulta = await getDoc(docuRef);
        //revisar si existe
        if (consulta.exists()) {
            //si sí existe
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        } else {
            //si no existe
            await setDoc(docuRef, { tareas: [...fakeData] });
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        }
        
        
        
    }

    useEffect(() => {
        async function fetchTareas() {
            const tareasFetchadas = await buscarDocumentoOCrearDocumento(
                correoUsuario
            );
            setArrayTareas(tareasFetchadas)
        }
        fetchTareas();

    }, [] );

    return (
<Container>
    <h4>Hola, sesión iniciada</h4>
    <Button onClick={() => signOut(auth)}>Cerrar sesión</Button>
    <hr />
    {arrayTareas ?(
       <ListadoTareas arrayTareas={arrayTareas}
        setArrayTareas={setArrayTareas}
        correoUsuario={correoUsuario}
        />    
    ) : null}
    
</Container>
    ); 
};

export default Home;