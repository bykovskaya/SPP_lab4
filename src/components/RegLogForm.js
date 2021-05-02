import React, { Component } from "react";
// import ReactDOM from "react-dom";
import '../styles/RegLogForm.css';
import socket from "./socket";

class RegLogForm extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '', message: ''};
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeLogin(e){
        let value = e.target.value;
        this.setState({ login: value });
    }

    onChangePassword(e){
        let value = e.target.value;
        this.setState({ password: value });
    }

    onSubmit(e){
        e.preventDefault();
        if(e.target.value === 'Registrate'){
            socket.emit('registrate', {login: this.state.login, password: this.state.password});
        }else{
            socket.emit('login', {login: this.state.login, password: this.state.password});
        }
    }

    render() {
        return (
            <form >
                <label>Login:</label><br />
                <input type="text" value={this.state.login} onChange={this.onChangeLogin} /><br />
                <label>Password</label><br />
                <input type="password" value={this.state.password} onChange={this.onChangePassword} /><br /><br />
                <input type="submit" value="Registrate" onClick={this.onSubmit} />
                <input type="submit" value="Login"  onClick={this.onSubmit}/>
                <p className='message'>{this.state.message}</p>
            </form >
        );
    }
}

export default RegLogForm;