import React, { Component } from "react";

class List extends Component {
    
    render() {
        return <div className="col-12">
            <h1>Listado de usuarios</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Nombre completo</th>
                        <th>Edad</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.list.map(e =>{
                            return <tr e={e} key={e.key}>
                                <td>{e.nombre} {e.apellido}</td>
                                <td>{e.edad}</td>
                                <td>{e.nacimiento}</td>
                                <td><button className="btn btn-primary" onClick={this.props.deleteTask.bind(this, e.key)}>x</button>
</td>
                    </tr>})}
                    </tbody>
                </table>

                <label>Promedio de edad: </label>
                <label> <strong>{this.props.promedioEdad()}</strong></label>
<br />
                <label>Desviaciòn estandar: </label>
                <label> <strong>{this.props.desviacionEstandar()}</strong></label>

            </div>
    }
}

export default List;