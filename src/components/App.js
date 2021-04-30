import React, { Component } from "react";
import RegLogForm from "./RegLogForm.js";
import Message from "./Message"
import socket from "./socket";



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'guest',
            user:{},
            msgs:[]
        }
        this.getUser = this.getUser.bind(this);
    }

    getUser(aUser){
      this.setState({user:aUser, status:'user'});
    }

    componentDidMount(){
      console.log('А че в смысле');
      socket.on('messages', data => {
        console.log(data);
      });
    }

    render(){
        return <div>
          <div className='reglog'><RegLogForm onLogin={this.getUser}/></div>
          <div className='chat'>{
            this.state.msgs.map((msg, i)=>{
                return <Message key={i} data={msg} />
            })
          }</div>
          </div>
    }
}

export default App; 
//omg