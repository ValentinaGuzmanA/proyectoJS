import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './pages/auth/login';
import CrearCuenta from './pages/auth/crearCuenta';
import Home from './pages/home'
import InsertarEmpleado from './components/InsertarEmpleado';
import ProyectosA from './pages/projects/ProyectosA';
import EmpleadoEditar from './pages/projects/EmpleadoEditar';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>

          <Route path="/" exact element = {<Login/>}/>
          <Route path="/crearCuenta" exact element = {<CrearCuenta/>}/>
          <Route path="/home" exact element = {<Home/>}/>
          <Route path="/proyectos-a" exact element = {<ProyectosA/>}/>
          <Route path="/proyectos-a" exact element = {<InsertarEmpleado/>}/>
          <Route path="/empleado-editar/:idEmpleado" exact element = {<EmpleadoEditar/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
