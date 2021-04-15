import React, { Component } from "react";
import './UserForm.css';
import firebaseConf from '../configBD/Firebase'
class UserForm extends Component {
    state = {
        nombre: '',
        edad: '',
        apellido: '',
        nacimiento: '',
        error: [],
        enviar: false
        }

    handleClic = () => {
        window.location.href = "/lista"
    }

    validaForm() {
        let error = {}
        let enviar= true

        if(!this.state.nombre) {
            enviar= false
            error['nombre'] = "Ingresar Nombre"
        }
        if(!this.state.apellido) {
            enviar= false
            error['apellido'] = "Ingresar apellido"
        }
        if(!this.state.edad) {
            enviar= false
            error['edad'] = "Ingresar edad"
        }
        if(!this.state.nacimiento) {
            enviar= false
            error['nacimiento'] = "Ingresar fecha de nacimiento"
        }
        
        this.setState({error:error});

        return enviar;
    }

    enviar = e => {
        e.preventDefault();
        
        if(this.validaForm()){
            firebaseConf.database().ref('form').push(this.state).then(() => {
            }).catch(() => {
                alert('NO ENVIADO')
            })
            this.handleClic()
        }
        // this.props.addTask(this.state.nombre, this.state.apellido);
    }

    inputText = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-6">
                <form onSubmit={this.enviar}>
                    <h1>Resgistro de Usuarios</h1>
                <label className="form-label">Nombre</label>
                <input className="form-control" name="nombre" type="text" placeholder="Ingresar nombre" onChange={this.inputText} value={this.state.nombre} />
                <span className="valid">{this.state.error["nombre"]}</span>

                <label className="form-label">Apellido</label>
                <input className="form-control" name="apellido" type="text" placeholder="Ingresar apellido" onChange={this.inputText} value={this.state.apellido} />
                <span className="valid">{this.state.error["apellido"]}</span>

                <label className="form-label">Edad</label>
                <input className="form-control" name="edad" type="number" placeholder="Ingresar edad" onChange={this.inputText} value={this.state.edad} />
                <span className="valid">{this.state.error["edad"]}</span>

                <label className="form-label">F. Nacimiento</label>
                <input className="form-control" name="nacimiento" type="date" placeholder="Ingresar fecha de nacimiento" onChange={this.inputText} value={this.state.nacimiento} />
                <span className="valid">{this.state.error["nacimiento"]}</span>

                {/* <textarea name="descripcion" placeholder="Comentario" onChange={this.inputText} value={this.state.descripcion}></textarea> */}

                <input onClick={this.handleClick} className="btn btn-primary mt-2 col-12" type="submit" value="Registrar"/>
            </form>
            </div>
        )
    }

}

export default UserForm;