import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SidebarContainer from "../../components/SidebarContainer";
import ContentHeader from "../../components/ContentHeader";
import Footer from "../../components/Footer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const EmpleadoEditar = () => {

    const navigate = useNavigate();

    const { idEmpleado } = useParams();
    let arreglo = idEmpleado.split('-');
    const nombreEmpleado = arreglo[1];
    const emailEmpleado = arreglo[2];
    const identificacionEmpleado = arreglo[3];
    const passwordEmpleado = arreglo[4];

    const [Empleado, setEmpleado] = useState({
        nombre: nombreEmpleado,
        email: emailEmpleado,
        identificacion: identificacionEmpleado,
        password: passwordEmpleado
    });

    const { nombre, email, identificacion, password } = Empleado;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, []);


    const onChange = (e) => {
        setEmpleado({
            ...Empleado,
            [e.target.name]: e.target.value
        });
    }

    const editarEmpleado = async () => {
        let arreglo = idEmpleado.split('-');
        const idP = arreglo[0];

        const data = {
            nombre: Empleado.nombre,
            email: Empleado.email,
            identificacion: Empleado.identificacion,
            password: Empleado.password
        }

        const response = await APIInvoke.invokePUT(`/Empleado/${idP}`, data);
        const idEmpleadoEditado = response.id;
        console.log(idEmpleadoEditado)
        console.log(idP)

        if (idEmpleadoEditado !== idP) {
            navigate("/proyectos-a");
            const msg = `El paciente con el id ${idEmpleadoEditado} se edito correctamente`;
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
            const msg = 'El Empleado no se edito '
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
        editarEmpleado();
    }

    return ( 
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Edición de Empleados"}
                    breadCrumb1={"Listado de Empleados"}
                    breadCrumb2={"Edición"}
                    ruta1={"/proyectos-a"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><button type="button" className="btn btn-block btn-primary btn-sm">Insertar Empleado</button></h3>

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
                                        <label htmlFor="nombre">Nombre </label>
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

                                        <label htmlFor="identificacion">identificacion</label>
                                        <input type="text"
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
                                    <button type="submit" className="btn btn-primary">Actualizar informacion de empleado</button>
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
 
export default EmpleadoEditar;