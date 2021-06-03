import React, { Component } from "react";
import '../styles/Message.css';

class Message extends Component{
    constructor(props){
        super(props);
        this.state={ sbMenu: false};
        this.deleteMsg = this.deleteMsg.bind(this);
        this.callSubMenu = this.callSubMenu.bind(this); 
    }

    deleteMsg(){
        console.log('delete message ', this.props.data.id);
    }

    callSubMenu(){
        this.setState({sbMenu: true});
    }

    render(){
        return <div id={this.props.data.id} onDoubleClick={this.callSubMenu} className={this.props.data.sender == this.props.user.login ? "mymessage":"message"}>
            <h4>{this.props.data.sender}</h4>
            <p>{this.props.data.text}</p>
            <p>{this.props.data.date} {this.props.data.time}</p>
        </div>
    }
}

export default Message;

class SubMenu extends Component{
    render(){
        return <div className='submenu'>
            <p onClick={this.props.delete}>Delete</p>
            <p onClick={this.props.edit}>Edit</p>
        </div>
    }
}