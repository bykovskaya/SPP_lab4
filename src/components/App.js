import React, { Component } from "react";
import io from 'socket.io-client'   ; 

const socket = io.connect('http://localhost:8888');
socket.on('eventClient', function (data) {
    console.log(data);});

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{id:undefined, login:'guest'}
        }
    }

    render(){
        return <MyForm />
    }
}

export default App; 

class MyForm extends React.Component {

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addGood = this.addGood.bind(this);
      this.changeGoodCount = this.changeGoodCount.bind(this);
      this.state = { goods: [] };
    }
  
    handleSubmit() {
      console.log('handleSubmit');
    }
  
    addGood() {
      const { goods } = this.state;
      this.setState({ goods: [ ...goods, { count: 0 } ] });
    }
  
    changeGoodCount(n, count) {
      const { goods } = this.state;
      this.setState({ goods: goods.map( (good, i) => i === n ? { count } : good ) });
    }
  
    render() {
      const { goods } = this.state;
      const { handleSubmit, addGood, changeGoodCount } = this;
      console.log('MyForm.render() -> goods =', goods);
      return (
        <form onSubmit={handleSubmit}>
            <div>
            Имя пользователя: <input type="text" />
          </div>
          <div>
            Телефон: <input type="text" />
          </div>
          <div>
            { goods.map( (good, i) => <GoodInput key={i} good={good} n={i} onChange={changeGoodCount}/> ) }
          </div>
          <div>
            <button type="button" onClick={addGood}>Добавить что-либо</button>
          </div>
        </form>
      );
    }
  }
  
  class GoodInput extends React.Component {
    handleChange(e) {
      const { n, onChange } = this.props;
      const count = e.currentTarget.value;
      onChange(n, count);
    }
  
    render() {
      const { good, n } = this.props;
      return ( 
        <div>
          Количество товара {n} <input type="text" onChange={(e) => this.handleChange(e)} />
        </div>
      );
    }
  }