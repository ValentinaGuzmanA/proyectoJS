import React from "react";
import Navbar from "../../components/Navbar";
import SidebarContainer from "../../components/SidebarContainer";
import ContentHeader from "../../components/ContentHeader";
import Footer from "../../components/Footer";
import data from "../../bbdd.json";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

const ProyectosAdmin = () => {
    // Para redirecconar de un componente a otro
  const navigate = useNavigate();

    const eliminarPaciente = async (e, idPaciente) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/Pacientes/${idPaciente}`); 
        console.log(response);
        swal({
            title: "Información",
            text: 'El paciente fue borrado correctamente',
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
        navigate("/proyectos-admin");
    }

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de pacientes"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Pacientes"}
          ruta1={"/home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><Link to={"/pacientes-crear"} className="btn btn-block btn-primary btn-sm">Insertar paciente</Link></h3>

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
                    <th style={{ width: "5%" }}>Id</th>
                    <th style={{ width: "20%" }}>Nombre</th>
                    <th style={{ width: "20%" }}>Email</th>
                    <th style={{ width: "20%" }}>Tipo documento</th>
                    <th style={{ width: "15%" }}>Número documento</th>
                    <th style={{ width: "20%" }}>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.Pacientes.map((paciente) => (
                    <tr key={paciente.id}>
                      <td>{paciente.id}</td>
                      <td>{paciente.full_name}</td>
                      <td>{paciente.email}</td>
                      <td>{paciente.document_type}</td>
                      <td>{paciente.document_number}</td>
                      <td>
                      <Link to={`/pacientes-editar/${paciente.id}-${paciente.full_name}-${paciente.email}-${paciente.document_type}-${paciente.document_number}-${paciente.password}`} className="btn btn-sm btn-info">Tareas</Link> &nbsp; &nbsp; 
                        <Link to={`/pacientes-editar/${paciente.id}-${paciente.full_name}-${paciente.email}-${paciente.document_type}-${paciente.document_number}-${paciente.password}`} className="btn btn-sm btn-primary">Editar</Link> &nbsp; &nbsp; 
                        <button onClick={(e) => eliminarPaciente(e, paciente.id)} className="btn btn-sm btn-danger">Borrar</button>
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

export default ProyectosAdmin;
