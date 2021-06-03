import React, { Component } from "react";
import MessageForm from './MessageForm';
import Message from './Message';
import socket from './socket';

class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            msgs:[]
        }
        this.getMessages = this.getMessages.bind(this);
    }

    getMessages(){
        socket.on('message', (msg)=>{
            let t_msgs = this.state.msgs;
            console.log(msg);
            t_msgs.push(msg);
            this.setState({msgs: t_msgs});
        })
    }

    componentDidMount(){
        this.getMessages();
    }
    
    render(){
        return <div className='chat'>
        {this.state.msgs.map((msg, i)=>{
            return <Message key={i} data={msg} user={this.props.sender}/>
        })}
        <div><MessageForm sender={this.props.sender}/></div>
        </div>
    }
}



export default Chat;