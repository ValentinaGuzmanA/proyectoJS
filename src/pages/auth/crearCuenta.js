import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';

const CrearCuenta = () => {
  const [paciente, setPaciente] = useState({
    full_name: "",
    email: "",
    document_type: "",
    document_number: "",
    password: "",
  });

  const { full_name, email, document_type, document_number, password } = paciente;

  const onChange = (e) => {
    setPaciente({
      ...paciente,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("full_name").focus();
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
        full_name: paciente.full_name,
        email: paciente.email,
        document_type: paciente.document_type,
        document_number: paciente.document_number,
        password: paciente.password
      }
      const response = await APIInvoke.invokePOST(`/Pacientes`, data);
      const mensaje = response.msg;

      if(mensaje === 'El paciente ya existe') {
        const msg = "el paciente ya existe.";
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
            <b>Bienve</b>nido
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
                  placeholder="Full name"
                  name="full_name"
                  id="full_name"
                  value={full_name}
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
                  placeholder="Email"
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

              {/* Div for document type */}
              <div className="input-group mb-3">
                <select name="document_type" onChange={onChange} value={document_type}>
                  <option>Cedula de ciudadania</option>
                  <option>Tarjeta de identidad</option>
                  <option>Pasaporte</option>
                </select>
              </div>

              {/* Div for document number */}
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Document number"
                  name="document_number"
                  value={document_number}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
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
                    <label htmlFor="agreeTerms">
                      I agree to the <Link to={"#"}>terms</Link>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <Link to={"/"} className="btn btn-block btn-danger">
                Cancelar
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
