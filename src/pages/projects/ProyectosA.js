import React from "react";
import Navbar from "../../components/Navbar";
import SidebarContainer from "../../components/SidebarContainer";
import ContentHeader from "../../components/ContentHeader";
import Footer from "../../components/Footer";
import data from "../../bbdd.json";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

const ProyectosA = () => {
    // Para redirecconar de un componente a otro
  const navigate = useNavigate();

    const eliminarEmpleado = async (e, idEmpleado) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/Empleado/${idEmpleado}`); 
        console.log(response);
        swal({
            title: "Información",
            text: 'El Empleado fue Eliminado',
            icon: "success",
            buttons: {
              confirm: {
                text: "Ok",
                value: true,
                visible: true,
                className: "btn btn-danger",
                closeModal: true,
              },
            },
          });
        // Redireccionar
        navigate("/proyectos-a");
    }

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Empleado"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Empleado"}
          ruta1={"/home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><Link to={"/Empleado-crear"} className="btn btn-block btn-primary btn-sm">Insertar Empleado</Link></h3>

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
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Id</th>
                    <th style={{ width: "25%" }}>Nombre</th>
                    <th style={{ width: "25%" }}>Email</th>
                    <th style={{ width: "25%" }}>identificacion</th>

                  </tr>
                </thead>
                <tbody>
                  {data.Empleado.map((Empleado) => (
                    <tr key={Empleado.id}>
                      <td>{Empleado.id}</td>
                      <td>{Empleado.nombre}</td>
                      <td>{Empleado.email}</td>
                      <td>{Empleado.identificacion}</td>
                  
                      <td>
                   
                        <Link to={`/Empleado-editar/${Empleado.id}-${Empleado.nombre}-${Empleado.email}-${Empleado.identificacion}-${Empleado.password}`} className="btn btn-sm btn-primary">Actualizar empleado</Link> &nbsp; &nbsp; 
                        <button onClick={(e) => eliminarEmpleado(e, Empleado.id)} className="btn btn-sm btn-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProyectosA;
