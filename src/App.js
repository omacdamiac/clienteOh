import React, {Component}from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import mock from './samples/mock.json';
//componentes
import Tasks from './components/Tasks';
import UserForm from './components/UserForm';
import Post from './components/Post';
import List from './components/Listado/List';
import firebaseConf from './configBD/Firebase';

// const User = (props) => <div className="usuario">{props.user}</div>

class App extends Component {
    state = {

        list: [],
        mock: mock
    }

     async componentDidMount() {
         await this.cargarData();
         console.log(this.state.list);
    }

    async cargarData() {
        const snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));
        await firebaseConf.database().ref('form').on('value', snapshot => {
        const data = snapshotToArray(snapshot.val());
        console.log(data);
        if (data != null) {
            this.setState({ list: data });
        } else {
          this.setState({ list: data });
                }
        })
    }

    desviacionEstandar = () => {
        if(this.state.list.length !== 0) {
        const count = this.state.list.length
        const promedio = this.state.list.map(e => Number(e.edad));
        const media = promedio.reduce((a, b) => a + b, 0)/count;

        const distancia = promedio.map(i => (i - media))
        const distancias =  distancia.map(n => n * n)
        const resultD = distancias.reduce((a, b) => a + b, 0);
        return Math.sqrt(resultD/count);
        }
    }

    promedioEdad = () => {
        if(this.state.list.length !== 0) {
        const count = this.state.list.length
        const promedio = this.state.list.map(e => Number(e.edad));
        return promedio.reduce((a, b) => a + b, 0)/count;
        }

    }

    addTask = (nombre, apellido, edad, nacimiento) => {
        const newTask = {
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            nacimiento: nacimiento,
            id: this.state.mock.length
        }
        this.setState({
            mock: [...this.state.mock, newTask]
        })
    }

    deleteTask = (id) => {
        console.log(id);
         firebaseConf.database().ref('form').child(id).remove()
    }

    checkDone = (id) => {
        const borrar = this.state.mock.map(
            e => {
                if(e.id === id) {
                    e.done = !e.done
                }
                return e;
            });
        this.setState({
            mock: borrar
        })
    }

    render() {
        return <div className="container">
                    <Router>
                        <ul className="nav">
                        <li className="nav-item">
                                <Link className="nav-link active" to="/">Registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="post">Listado</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="lista">Listado Usuarios</Link>
                            </li>
                        </ul>
                        <Route exact path="/" render={()=> {
                            return  <div className="row">
                                        <UserForm addTask={this.addTask}/>
                                        <Tasks mock={this.state.mock} deleteTask={this.deleteTask} checkDone={this.checkDone}/>
                                    </div>
                        }}>
                        </Route>
                        <Route path="/post" component={Post} />
                        <Route  path="/lista" render={()=>{
                            return <div className="row">
                                <List list={this.state.list} desviacionEstandar={this.desviacionEstandar} promedioEdad={this.promedioEdad}  deleteTask={this.deleteTask} />
                            </div>
                        }}>
                        </Route>
                    </Router>
                </div>
    }
}

export default App;