import React, { Component } from "react";
import socket from './socket';
import ss from 'socket.io-stream';

class MessageForm extends Component{
    constructor(props) {
        super(props);
        this.state = { text: '', file:false};
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
            let file = this.fileInput.current.files[0];
            let stream = ss.createStream();

            ss(socket).emit('message', stream, {
                text:this.state.text, 
                date:`${dd.getFullYear()}-${dd.getMonth()<10? '0'+dd.getMonth():dd.getMonth()}-${dd.getDate()<10? '0'+dd.getDate(): dd.getDate()}`, 
                time:`${dd.getHours()<10? '0'+dd.getHours():dd.getHours()}:${dd.getMinutes()<10? '0'+dd.getMinutes():dd.getMinutes()}`,
                sender:this.props.sender.login,
                fileName:file
            })
            ss.createBlobReadStream(file).pipe(stream);
            this.setState({text:''});
        }
    }

    render(){
        return <form >
            <input type='text' value={this.state.text} onChange={this.onChangeText}/>
            <input type="file" ref={this.fileInput}/>
            <input type='submit' value='>>' onClick={this.sendMessage} />
        </form>
    }
}

export default MessageForm;
