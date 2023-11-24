import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';


const CrearCuenta = () => {
  const [Empleado, setEmpleado] = useState({
    nombre: "",
    email: "",
    identificacion: "",
    password:"",
  });

  const { nombre, email , identificacion , password } = Empleado;

  const onChange = (e) => {
    setEmpleado({
      ...Empleado,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);


  const crearCuenta = async () => {
    if(password.length < 6) {
      const msg = "La contraseña debe tener minimo 6 caracteres"
      swal ({
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
      const data = {
        nombre: Empleado.nombre,
        email: Empleado.email,
        identificacion: Empleado.identificacion,
        password: Empleado.password
      }
      const response = await APIInvoke.invokePOST(`/Empleado`, data);
      const mensaje = response.msg;

      if(mensaje === 'El Empleado ya existe') {
        const msg = "El Empleado ya existe.";
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
        const msg = "Cuenta creada exitosamente.";
        swal({
          title: 'Información',
          text: msg,
          icon: 'info',
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
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();
  };

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="register-logo">
          <Link to={"#"}>
            <b>Bienvenido a serviplus</b>
          </Link>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Registrate, para poder continuar</p>

            {/* Form */}
            <form onSubmit={onSubmit}>
              {/* Div for full name */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                  name="nombre"
                  id="nombre"
                  value={nombre}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>

              {/* Div for email */}
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

            
              {/* Div for email */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu identificacion"
                  name="identificacion"
                  value={identificacion}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="webform submission-1" />
                  </div>
                </div>
              </div>
             
              {/* Div for password */}
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
                    
                  </div>
                </div>
                <button
                  type="submit"
                  to={"#"}
                  className="btn btn-block btn-primary"
                >
                  Crear Cuenta
                </button>
              </div>
            </form>
            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <Link to={"/"} className="btn btn-block btn-danger">
                Ingresar
              </Link>
            </div>
            <Link to={"/"} className="text-center">
              ¿Ya tienes una cuenta?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
