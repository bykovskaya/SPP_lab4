import React, { Component } from "react";
// import ReactDOM from "react-dom";
import '../styles/RegLogForm.css';

class RegLogForm extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '', message: '', status: 0};
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeLogin(e){
        let value = e.target.value;
        this.setState({ login: value });
    }

    onChangePassword(e){
        let value = e.target.value;
        this.setState({ password: value });
    }

    render() {
        return (
            <form /*onSubmit={this.handleSubmit}*/>
                <label>Login:</label><br />
                <input type="text" value={this.state.login} onChange={this.onChangeLogin} /><br />
                <label>Password</label><br />
                <input type="password" value={this.state.password} onChange={this.onChangePassword} /><br /><br />
                <input type="submit" value="Registrate" />
                <input type="submit" value="Login" />
                <p className='message'>{this.state.message}</p>
            </form >
        );
    }
}

export default RegLogForm;