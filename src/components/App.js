import React, { Component } from 'react';
import RegLogForm from './RegLogForm.js';
import Chat from './Chat';
import Header from './Header';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'guest',
            user:{},
        }
        this.setUser = this.setUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    setUser(aUser){
      this.setState({user:aUser, status:'user'});
    }
    
    logout(){
      this.setState({user:{}, status:'guest'});
    }

    render(){
      if(this.state.status == 'guest'){
        return <div>
          <Header status={this.state.status} user={this.state.user} logout={this.logout}/>
          <div className='reglog'><RegLogForm setUser={this.setUser}/></div>
        </div>
      }
      else{
        return <div>
          <Header status={this.state.status} user={this.state.user} logout={this.logout}/>
          <Chat sender={this.state.user}/>
          </div>
      }
    }
}

export default App; 
//omg