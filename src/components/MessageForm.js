import React, { Component } from "react";
import socket from './socket';

class MessageForm extends Component{
    constructor(props) {
        super(props);
        this.state = { text: ''};
        this.onChangeText = this.onChangeText.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.fileInput = React.createRef();
    }

    onChangeText(e){
        this.setState({text:e.target.value});
    }

    sendMessage(e){
        e.preventDefault();
        let dd = new Date();
        if(this.state.text !== '')
        {
            // console.log(this.state.text, this.props.sender.login, `${dd.getFullYear()}-${dd.getMonth()}-${dd.getDate()}`, dd.getHours()+":"+dd.getMinutes());

            socket.emit('message', {
                text:this.state.text, 
                sender:this.props.sender.login, 
                date:`${dd.getFullYear()}-${dd.getMonth()}-${dd.getDate()}`, 
                time:dd.getHours()+":"+dd.getMinutes()
            })
            this.setState({text:''});
        }
    }
    
    render(){
        return <form >
            <input type='text' value={this.state.text} onChange={this.onChangeText}/>
            <input type='submit' value='>>' onClick={this.sendMessage} />
        </form>
    }
}

export default MessageForm;

class FileInput extends Component{
    render(){
        if(this.props.file === null){
            return <p><input type="file" ref={this.props.r} /></p>
        }
        else{
            return <p>FILE
                <input type="submit" value="X" onClick={this.props.deleteFile} className="button"/>
            </p>
        }
    }
}