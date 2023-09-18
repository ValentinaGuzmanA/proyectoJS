import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import data from "../../bbdd.json";

const Login = () => {
  // Para redirecconar de un componente a otro
  const navigate = useNavigate();

  // Estado inicial de las variables
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

  const iniciarSesion = async () => {
    if (password.length < 6) {
      const msg = "La contraseña debe tener mínimo 6 caracteres";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
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
    } else {
      const usuario = data.Pacientes.find(paciente => paciente.email === email);
  
      if (usuario) {
        if (usuario.password === password) {
          const msg = "Inicio de sesión exitoso";
          swal({
            title: "Éxito",
            text: msg,
            icon: "success",
            buttons: {
              confirm: {
                text: "Ok",
                value: true,
                visible: true,
                className: "btn btn-success",
                closeModal: true,
              },
            },
          });

          // Redireccionar al home
          navigate("/home");
        } else {
          const msg = "Contraseña incorrecta. Por favor, inténtelo de nuevo.";
          swal({
            title: "Error",
            text: msg,
            icon: "error",
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
        }
      } else {
        const msg = "Correo electrónico no encontrado. Por favor, regístrese si es un nuevo usuario.";
        swal({
          title: "Error",
          text: msg,
          icon: "error",
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
      }
    }
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Inicio de Sesion</b>
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              Bienvenido, Ingrese sus credenciales
            </p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
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
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
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

              <div className="social-auth-links text-center mb-3">
                <button
                  type="submit"
                  to={"#"}
                  className="btn btn-block btn-primary"
                >
                  Ingresar
                </button>
                <Link to={"crearCuenta"} className="btn btn-block btn-danger">
                  Crear una cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

//
export default Login;
