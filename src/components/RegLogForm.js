import React, { Component } from "react";
// import ReactDOM from "react-dom";
import '../styles/RegLogForm.css';

class RegLogForm extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '', message: ''};
        this.onTypeLogin = this.onTypeLogin.bind(this);
        this.onTypePassword = this.onTypePassword.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onReg = this.onReg.bind(this);
    }

    onTypeLogin(e){
        let value = e.target.value;
        this.setState({ login: value });
    }

    onTypePassword(e){
        let value = e.target.value;
        this.setState({ password: value });
    }

    onLogin(e){
        e.preventDefault();
        
        fetch('/log', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({login:this.state.login, password:this.state.password})
        })
        .then(resp => {
            let r_status = resp.status;
            resp.json()
            .then(data => {
                console.log(r_status, data);
                this.props.setUser(data);
            })
        })
        .catch(err => { console.log(err)})
    }

    onReg(e){
        e.preventDefault();
        fetch('/reg', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({login:this.state.login, password:this.state.password})
        })
        .then(resp => {
            let r_status = resp.status;
            resp.json()
            .then(data => {
                console.log(r_status, data);
            })
        })
        .catch(err => { console.log(err)})
        this.setState({login:'', password:''});
    }
    
    render() {
        return (
            <form >
                <label>Login:</label><br />
                <input type="text" value={this.state.login} onChange={this.onTypeLogin} /><br />
                <label>Password</label><br />
                <input type="password" value={this.state.password} onChange={this.onTypePassword} /><br /><br />
                <input type="submit" value="Registrate" onClick={this.onReg} />
                <input type="submit" value="Login"  onClick={this.onLogin}/>
                <p className='message'>{this.state.message}</p>
            </form >
        );
    }
}

export default RegLogForm;