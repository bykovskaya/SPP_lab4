import React, { Component } from "react";
import '../styles/Header.css';

class Header extends Component{
render(){    
    return <div className='header'>
        <ul>
            <li>{(this.props.status !== 'guest')?this.props.user.login: "Hello!"}</li>
            <li onClick={this.props.logout}>{(this.props.status !== 'guest')?"Logout": ""}</li>
        </ul>
    </div>
}
}

export default Header;