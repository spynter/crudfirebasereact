import { async } from "@firebase/util";
import React from "react";
import { Stack, Container, Row, Button, Col } from "react-bootstrap";

import fireBaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(fireBaseApp);

const ListadoTareas = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

    async function eliminarTarea(idTareaAEliminar) {
        //crear nuevo array de tareas
        const nvoArrayTareas = arrayTareas.filter(
            (objetoTarea) => objetoTarea.id !== idTareaAEliminar
        );
        //actualizar base de datos
        const docuRef = doc(firestore, `usuario/${idDocumento}`);
        updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
        //actualizar state
        setArrayTareas(nvoArrayTareas);
    }
    return ( 
    <Container>
        <Stack>
            {arrayTareas.map((objetoTarea) => {
                return (
                <>
                    <Row>
                        <Col> {objetoTarea.descripcion}</Col>
                        <Col>
                            <Button>Ver Archivo</Button>
                        </Col>
                        <Col>
                            <Button onClick={()=> eliminarTarea(objetoTarea.id)} >Eliminar Tarea</Button>
                        </Col>
                    </Row>
                    <hr />
                </>
                );
            })}
        </Stack>
    </Container>
    );
};
 
export default ListadoTareas;