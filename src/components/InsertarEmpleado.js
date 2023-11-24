import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SidebarContainer from "./SidebarContainer";
import ContentHeader from "./ContentHeader";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../utils/APIInvoke";
import swal from 'sweetalert';

const InsertarEmpleado = () => {

    const navigate = useNavigate();

    const [Empleado, setEmpleado] = useState({
        nombre: '',
        email: "",
        identificacion: "",
        password: ""
    });

    const { nombre, email, identificacion,  password } = Empleado;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, []);


    const onChange = (e) => {
        setEmpleado({
            ...Empleado,
            [e.target.name]: e.target.value
        });
    }

    const crearEmpleado = async () => {
        const data = {
            nombre: Empleado.nombre,
            email: Empleado.email,
            identificacion: Empleado.identificacion,
            password: Empleado.password

        }

        const response = await APIInvoke.invokePOST(`/Empleado`, data);
        const idEmpleado = response.id;

        if (idEmpleado === '') {
            const msg = 'El Empleado no se registro correctamente.'
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
            navigate('/proyectos-a');
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

            setEmpleado({
                nombre: ''
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearEmpleado();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Creación de Empleados"}
                    breadCrumb1={"Listado de Empleado"}
                    breadCrumb2={"Creación"}
                    ruta1={"/proyectos-a"}
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
                                        <label htmlFor="nombre">Nombre completo</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ingrese nombre"
                                            value={nombre}
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

                                        <label htmlFor="identificacion">Email</label>
                                        <input type="identificacion"
                                            className="form-control"
                                            id="identificacion"
                                            name="identificacion"
                                            placeholder="Ingrese un identificacion"
                                            value={identificacion}
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
                                    <button type="submit" className="btn btn-primary">Insertar Empleado</button>
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

export default InsertarEmpleado;