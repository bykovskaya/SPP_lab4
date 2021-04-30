import React, { Component } from "react";

class Message extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div id={this.props.data.id}>
            <label>{this.props.data.sender}</label>
            <p>{this.props.data.text}</p>
        </div>
    }
}

export default Message;