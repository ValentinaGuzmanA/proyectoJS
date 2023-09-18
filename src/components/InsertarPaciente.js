import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SidebarContainer from "./SidebarContainer";
import ContentHeader from "./ContentHeader";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../utils/APIInvoke";
import swal from 'sweetalert';

const InsertarPaciente = () => {

    const navigate = useNavigate();

    const [paciente, setPaciente] = useState({
        full_name: '',
        email: "",
        document_type: "",
        document_number: "",
        password: ""
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

    const crearPaciente = async () => {
        const data = {
            full_name: paciente.full_name,
            email: paciente.email,
            document_type: paciente.document_type,
            document_number: paciente.document_number,
            password: paciente.password

        }

        const response = await APIInvoke.invokePOST(`/Pacientes`, data);
        const idPaciente = response.id;

        if (idPaciente === '') {
            const msg = 'El paciente no se registro correctamente.'
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
        } else {
            navigate('/proyectos-admin');
            const msg = 'El paciente se registro correctamente'
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

            setPaciente({
                full_name: ''
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearPaciente();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Creación de pacientes"}
                    breadCrumb1={"Listado de pacientes"}
                    breadCrumb2={"Creación"}
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
                                            <option></option>
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

export default InsertarPaciente;