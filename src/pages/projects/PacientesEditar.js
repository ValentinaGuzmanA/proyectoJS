import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SidebarContainer from "../../components/SidebarContainer";
import ContentHeader from "../../components/ContentHeader";
import Footer from "../../components/Footer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const PacientesEditar = () => {

    const navigate = useNavigate();

    const { idPaciente } = useParams();
    let arreglo = idPaciente.split('-');
    const nombrePaciente = arreglo[1];
    const emailPaciente = arreglo[2];
    const tipoDoc = arreglo[3];
    const numDoc = arreglo[4];
    const passwordPaciente = arreglo[5];

    const [paciente, setPaciente] = useState({
        full_name: nombrePaciente,
        email: emailPaciente,
        document_type: tipoDoc,
        document_number: numDoc,
        password: passwordPaciente
    });

    const { full_name, email, document_type, document_number, password } = paciente;

    useEffect(() => {
        document.getElementById("full_name").focus();
    }, []);


    const onChange = (e) => {
        setPaciente({
            ...paciente,
            [e.target.name]: e.target.value
        });
    }

    const editarPaciente = async () => {
        let arreglo = idPaciente.split('-');
        const idP = arreglo[0];

        const data = {
            full_name: paciente.full_name,
            email: paciente.email,
            document_type: paciente.document_type,
            document_number: paciente.document_number,
            password: paciente.password
        }

        const response = await APIInvoke.invokePUT(`/Pacientes/${idP}`, data);
        const idPacienteEditado = response.id;
        console.log(idPacienteEditado)
        console.log(idP)

        if (idPacienteEditado !== idP) {
            navigate("/proyectos-admin");
            const msg = `El paciente con el id ${idPacienteEditado} se edito correctamente`;
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
        } else {
            const msg = 'El paciente no se edito correctamente.'
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarPaciente();
    }

    return ( 
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Edición de pacientes"}
                    breadCrumb1={"Listado de pacientes"}
                    breadCrumb2={"Edición"}
                    ruta1={"/proyectos-admin"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><button type="button" className="btn btn-block btn-primary btn-sm">Insertar paciente</button></h3>

                            <div className="card-tools">
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                    title="Collapse"
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                    title="Remove"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="full_name">Nombre completo</label>
                                        <input type="text"
                                            className="form-control"
                                            id="full_name"
                                            name="full_name"
                                            placeholder="Ingrese nombre"
                                            value={full_name}
                                            onChange={onChange}
                                            required />

                                        <label htmlFor="email">Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Ingrese un email"
                                            value={email}
                                            onChange={onChange}
                                            required />

                                        <label htmlFor="document_type">Tipo de documento</label>
                                        <select name="document_type" className="form-control" onChange={onChange} value={document_type}>
                                            <option>Cedula de ciudadania</option>
                                            <option>Tarjeta de identidad</option>
                                            <option>Pasaporte</option>
                                        </select>


                                        <label htmlFor="document_number">Número de documento</label>
                                        <input type="number"
                                            className="form-control"
                                            id="document_number"
                                            name="document_number"
                                            placeholder="Número de documento"
                                            value={document_number}
                                            onChange={onChange}
                                            required />

                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Ingrese una contraseña"
                                            value={password}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
     );
}
 
export default PacientesEditar;