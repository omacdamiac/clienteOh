import React, {Component}from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import mock from './samples/mock.json';
//componentes
import UserForm from './components/UserForm';
import List from './components/Listado/List';
import firebaseConf from './configBD/Firebase';

class App extends Component {
    state = {
        list: [],
    }

    async componentDidMount() {
         await this.cargarData();
    }

    async cargarData() {
        const snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));
        await firebaseConf.database().ref('form').on('value', snapshot => {
        const data = snapshotToArray(snapshot.val());
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

    deleteTask = (id) => {
         firebaseConf.database().ref('form').child(id).remove()
    }

    render() {
        return <div className="container">
                    <Router>
                        <ul className="nav">
                        <li className="nav-item">
                                <Link className="nav-link active" to="/">Registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="lista">Listado Usuarios</Link>
                            </li>
                        </ul>
                        <Route exact path="/" render={()=> {
                            return  <div className="row">
                                        <UserForm addTask={this.addTask}/>
                                    </div>
                        }}>
                        </Route>
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